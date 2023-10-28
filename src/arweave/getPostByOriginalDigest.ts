import { OriginalDigestTag } from "../constants";
import { MirrorPost } from "./MirrorPost";
import { getTransactionData } from "./getTransactionData";
import { ArweaveTxn, getTag, getTransactionMetadataByDigest } from "./getTransactionMetadata";

export async function getPostByOriginalDigest(originalDigest: string): Promise<MirrorPost> {
	// get arweave transactions for the given original digest
	const txns = await getTransactionMetadataByDigest({ originalDigest })

	// get most recent timestamp
	const mostRecentTxn = txns.reduce((prev, current) => (prev.block.timestamp > current.block.timestamp) ? prev : current)

	// fetch most recent post
	const mostRecentPost = await getMirrorPost({ txn: mostRecentTxn })

	// getter for previous versions
	async function getPreviousVersions() {
		const prevTxns = txns.sort((a, b) => a.block.timestamp - b.block.timestamp).slice(0, -1)
		const prevPosts = await prevTxns.map(async (txn) => await getMirrorPost({ txn }))
		return prevPosts
	}

	return mostRecentPost
}

async function getMirrorPost({ txn }: {
	txn: ArweaveTxn
}) {
	const originalDigest = getTag(txn, OriginalDigestTag)
	const json = await getTransactionData(txn.id);
	json.originalDigest = originalDigest
	json.txnId = txn.id
	return json as MirrorPost
}
