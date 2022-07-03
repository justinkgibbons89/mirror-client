import { request, gql } from 'graphql-request'

/// Gets a list of transaction IDs for the given contributor address.
/// Transactions are pulled from the Arweave GraphQL endpoint.
export const getTransactionIds = async (address: string, limit: number) => {
	const endpoint = 'https://arweave.net/graphql'

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
        	}
        	}
    	}
	}
	`
	const vars = {
		'address': address,
		'limit': limit
	}

	console.log('getting ids for address ' + address + '...');
	const txnData = await request(endpoint, query, vars);

	const ids = txnData.transactions.edges.map((edge: any) => {
		return edge.node.id
	})

	return ids;
}