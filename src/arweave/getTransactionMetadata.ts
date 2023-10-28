// import { request } from 'graphql-request'
import { GraphQLEndpoint, OriginalDigestTag } from '../constants'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
	uri: GraphQLEndpoint,
	cache: new InMemoryCache(),
});

/// Gets a list of transaction IDs for the given contributor address.
/// Transactions are pulled from the Arweave GraphQL endpoint.
export const getTransactionMetadata = async (address: string, limit: number) => {

	const query = gql`
		query MirrorPosts($address: String!, $limit: Int) {
  			transactions(tags: [
      			{ 
        			name: "App-Name",
        			values: ["MirrorXYZ"]
      			},
      			{
        			name: "Contributor",
        			values: [$address]
      			}
    		], sort: HEIGHT_DESC, first: $limit) {
        	edges {
        	node {
            	id
				block {
					timestamp
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
	const response = await client.query({ query, variables: { address, limit } })
	const txns: ArweaveTxn[] = response.data.transactions.edges.map((edge: any) => { return edge.node })

	return txns;
}

/// Gets a list of transaction IDs for the given contributor address.
/// Transactions are pulled from the Arweave GraphQL endpoint.
export async function getTransactionMetadataByDigest({ originalDigest }:
	{
		originalDigest: string
	}) {

	const query = gql`
		query MirrorPosts($originalDigest: String!) {
  			transactions(tags: [
      			{ 
        			name: "App-Name",
        			values: ["MirrorXYZ"]
      			},
      			{
        			name: "Original-Content-Digest",
        			values: [$originalDigest]
      			}
    		], sort: HEIGHT_DESC) {
        	edges {
        	node {
            	id
				block {
					timestamp
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
	const response = await client.query({ query, variables: { originalDigest } })
	const txns: ArweaveTxn[] = response.data.transactions.edges.map((edge: any) => { return edge.node })

	return txns;
}

export interface ArweaveTxn {
	id: string;
	block: ArweaveTxnBlock;
	tags: ArweaveTxnTag[]
}

export interface ArweaveTxnTag {
	name: string;
	value: string;
}

export interface ArweaveTxnBlock {
	timestamp: number
}

export function getTag(txn: ArweaveTxn, name: string) {
	return txn.tags.find((tag: ArweaveTxnTag) => tag.name === name)?.value
}