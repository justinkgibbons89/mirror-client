import { OriginalDigestTag } from "../constants";
import { MirrorPost } from "./MirrorPost";
import { getTransactionData } from "./getTransactionData";
import { ArweaveTxn, getTag, getTransactionMetadata } from "./getTransactionMetadata";

// Gets a list of posts with a `contributor` tag matching the given address
export async function getPostsByContributor(address: string, limit: number): Promise<MirrorPost[]> {

	// get the transaction metadata from arweave graphql
	const txns = await getTransactionMetadata(address, limit);

	// sort the txns by their original digest
	let txnSets = txns.reduce((unique, cur: ArweaveTxn) => {
		// extract original digest
		const originalDigest = getTag(cur, OriginalDigestTag);

		// if there is no original digest, return the current set
		if (!originalDigest) return unique

		// if the original digest is not in the map, add it
		if (!unique[originalDigest]) unique[originalDigest] = []

		// add the txn to the set
		unique[originalDigest].push(cur)
		// (unique[cur.originalDigest] = unique[cur.originalDigest] || []).push(cur)
		return unique
	}, {} as Record<string, ArweaveTxn[]>)

	// get the most recent txn for each original digest
	let newestTxns: ArweaveTxn[] = []
	for (const txnSet of Object.values(txnSets)) {
		const newestTxn = txnSet.reduce((prev, current) => (prev.block.timestamp > current.block.timestamp) ? prev : current)
		newestTxns.push(newestTxn)
	}

	// get the data associated with each txn
	let posts: MirrorPost[] = []
	for (const txn of newestTxns) {
		const json = await getTransactionData(txn.id);
		const originalDigest = getTag(txn, OriginalDigestTag)

		if (originalDigest) {
			json.originalDigest = originalDigest
			json.block = txn.block
			posts.push(json);
		}
	}

	return posts
}

export async function getPostForTxn(txn: ArweaveTxn): Promise<MirrorPost | null> {
	const json = await getTransactionData(txn.id);
	const originalDigest = getTag(txn, OriginalDigestTag)

	let post: MirrorPost | null = null
	if (originalDigest) {
		json.originalDigest = originalDigest
		json.block = txn.block
		post = json;
	}

	return post
}

export function getLatestTxnByOriginalDigest(txns: ArweaveTxn[]) {
	// sort the txns by their original digest
	let txnSets = txns.reduce((unique, cur: ArweaveTxn) => {
		// extract original digest
		const originalDigest = getTag(cur, OriginalDigestTag);

		// if there is no original digest, return the current set
		if (!originalDigest) return unique

		// if the original digest is not in the map, add it
		if (!unique[originalDigest]) unique[originalDigest] = []

		// add the txn to the set
		unique[originalDigest].push(cur)
		// (unique[cur.originalDigest] = unique[cur.originalDigest] || []).push(cur)
		return unique
	}, {} as Record<string, ArweaveTxn[]>)

	// get the most recent txn for each original digest
	let newestTxns: ArweaveTxn[] = []
	for (const txnSet of Object.values(txnSets)) {
		const newestTxn = txnSet.reduce((prev, current) => (prev.block.timestamp > current.block.timestamp) ? prev : current)
		newestTxns.push(newestTxn)
	}

	return newestTxns
}


export async function getMirrorPost({ txn }: {
	txn: ArweaveTxn
}) {
	const json = await getTransactionData(txn.id);
	const originalDigest = getTag(txn, OriginalDigestTag)

	if (originalDigest) {
		json.originalDigest = originalDigest
		return json;
	}

	return null
}

type Block = {
	timestamp: number
	height: number
}