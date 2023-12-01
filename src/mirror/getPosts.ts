import { MirrorPost } from "../arweave/MirrorPost"
import { getPostForTxn } from "../arweave/getPostsByContributor"
import { ArweaveTxn } from "../arweave/getTransactionMetadata"

export async function getPosts(txns: ArweaveTxn[]) {
	let posts: MirrorPost[] = []
	for (const txn of txns) {
		const post = await getPostForTxn(txn)
		if (post) posts.push(post)
	}
	return posts
}