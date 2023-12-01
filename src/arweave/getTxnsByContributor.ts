import gql from 'graphql-tag';
import { GetTxnsForContributorQuery } from "../generated/graphql";
import request from 'graphql-request';
import { ArweaveTxn } from './getTransactionMetadata';
import { paginate } from '../requests/paginate';
import { ArweaveGraphQLEndpoint } from '../constants';

export const QUERY_TXNS_BY_CONTRIBUTOR = gql`
	query GetTxnsForContributor($address: String!, $first: Int, $sort: SortOrder, $after: String) {
		transactions(tags: [
			{ 
				name: "App-Name",
				values: ["MirrorXYZ"]
			},
			{
				name: "Contributor",
				values: [$address]
			}
		], sort: $sort, first: $first, after: $after) {
			__typename
			pageInfo {
				hasNextPage
			}
			edges {
				cursor
				node {
					id
					block {
						timestamp
						height
					}
					tags {
						name
						value
					}
				}
			}
		}
	}
`

async function fetchTxns(contributor: string, after?: string) {
	return await request<GetTxnsForContributorQuery>(
		ArweaveGraphQLEndpoint,
		QUERY_TXNS_BY_CONTRIBUTOR,
		{ address: contributor, first: 3, sort: "HEIGHT_ASC", after: after }
	)
}

export async function paginateTxns(
	contributor: string,
	batchSize: number,
	handleData: (txns: ArweaveTxn[]) => void
) {
	async function handlePaginate(data: GetTxnsForContributorQuery) {
		let txns = data.transactions.edges.map((edge: any) => { return edge.node }) as ArweaveTxn[]
		await handleData(txns)
		return data.transactions.edges[data.transactions.edges.length - 1]?.cursor
	}

	await paginate<GetTxnsForContributorQuery>(
		QUERY_TXNS_BY_CONTRIBUTOR,
		{ address: contributor, first: batchSize, sort: "HEIGHT_ASC" },
		handlePaginate
	)
}

