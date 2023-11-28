import { MirrorPost } from "./MirrorPost";
import { getLatestTxnByOriginalDigest, getPostForTxn } from "./getPostsByContributor";
import { ArweaveTxn, getBlockTransactions } from "./getTransactionMetadata";

export async function getPostsInBlockRange({
	startHeight,
	endHeight,
	first,
	after
}: {
	startHeight: number,
	endHeight?: number,
	first?: number,
	after?: string
}): Promise<{
	posts: MirrorPost[],
	hasNextPage: boolean,
	cursor: string | undefined
}> {
	console.log(`Fetching txns from ${startHeight} to ${endHeight || "LATEST"}, cursor: ${after}`)
	const txnsResult = await getBlockTransactions({ startHeight, endHeight, first, after });
	let hasNextPage = txnsResult.data.transactions.pageInfo.hasNextPage
	let cursor = txnsResult.data.transactions.edges[txnsResult.data.transactions.edges.length - 1].cursor
	console.log(`${txnsResult.data.transactions.edges.length} txns`)

	// sort the txns by their original digest
	let typedTxns = txnsResult.data.transactions.edges.map((edge: any) => { return edge.node }) as ArweaveTxn[]
	const latestTxns = await getLatestTxnByOriginalDigest(typedTxns)
	console.log(`${latestTxns.length} original digests`)

	// get posts for txns
	let posts: MirrorPost[] = []
	for (const txn of latestTxns) {
		const post = await getPostForTxn(txn)
		if (post) posts.push(post)
	}
	console.log(`${posts.length} posts`)

	return { posts, hasNextPage, cursor }
}