import { MirrorPost } from "../arweave/MirrorPost"
import { getLatestTxnByOriginalDigest, getPostForTxn } from "../arweave/getPostsByContributor";
import { ArweaveTxn } from "../arweave/getTransactionMetadata";
import { QUERY_TXNS_BY_CONTRIBUTOR, paginateTxns } from "../arweave/getTxnsByContributor"
import { GetTxnsForContributorQuery } from "../generated/graphql";
import { paginate } from "../requests/paginate";
import { getPosts } from "./getPosts";

export async function paginatePosts({ contributor, batchSize = 100 }: {
	contributor: string,
	batchSize?: number
}, handlePosts: (posts: MirrorPost[]) => void) {
	await paginate<GetTxnsForContributorQuery>(
		QUERY_TXNS_BY_CONTRIBUTOR,
		{ address: contributor, first: batchSize, sort: "HEIGHT_ASC" },
		async (data: GetTxnsForContributorQuery) => {
			// extract txns from response
			const txns = data.transactions.edges.map((edge: any) => { return edge.node })
			// get newest txn digets
			const newestTxns = getLatestTxnByOriginalDigest(txns);
			// get posts for txns
			const posts = await getPosts(newestTxns)
			// handle posts
			await handlePosts(posts)

			// return cursor (or undefined)
			return data.transactions.edges[data.transactions.edges.length - 1]?.cursor
		})
}