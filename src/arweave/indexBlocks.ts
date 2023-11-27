import { MirrorPost } from "./MirrorPost";
import { getLatestTxnByOriginalDigest, getPostForTxn } from "./getPostsByContributor";
import { ArweaveTxn, getBlockTransactions } from "./getTransactionMetadata";

export async function indexBlocks({ startHeight, endHeight }: { startHeight: number, endHeight?: number }, handler: (posts: MirrorPost[]) => void) {

	let hasNextPage = true
	let after: string | undefined

	while (hasNextPage) {
		// get posts for block range
		const result = await getPostsInBlockRange({ startHeight, endHeight, first: 100, after })
		hasNextPage = result.hasNextPage
		after = result.cursor

		// insert posts into database
		// insertPosts(result.posts)
		await handler(result.posts)
	}
}

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
	console.log(`Fetching txns from ${startHeight} to ${endHeight}, cursor ${after}...`)
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

function insertPosts(posts: MirrorPost[]) {
	// insert posts into database
	console.log(`Inserting ${posts.length} posts:`)
	for (const post of posts) {
		console.log(post.content.title)
	}
}
