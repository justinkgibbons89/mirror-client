import Arweave from 'arweave';
import { getTransactionIds, getTransactionIdsByDigest } from './getTransactionIds';

// Arweave object using the public arweave.net endpoint.
const arweave = Arweave.init({
	host: 'arweave.net',
	port: 443,
	protocol: 'https'
});

// Gets Arweave transaction data for the given transaction ID.
export const getTransactionData = async (id: string) => {
	console.log('getting data for id ' + id);
	const result = await arweave.transactions.getData(id, { decode: true, string: true }) as string
	const json = JSON.parse(result);
	return json
}

// Gets an array of Mirror posts authored by the contributor address from Arweave
export const getMirrorPosts = async (address: string, limit: number) => {

	// get the transaction ids for the addy
	const ids = await getTransactionIds(address, limit);

	// get the data for the ids and unique the results bv digest
	let uniquePosts: any = {}
	for (const id of ids) {
		const json = await getTransactionData(id);
		uniquePosts[json.originalDigest] = json;
	}

	// return just an array of the post objects, not the table indexed by digests
	const posts: any[] = Object.values(uniquePosts);
	return posts;
}

// Gets an array of Mirror posts authored by the contributor address from Arweave
export const getMirrorPostsByDigest = async (digest: string, limit: number) => {

	// get the transaction ids for the addy
	const ids = await getTransactionIdsByDigest(digest, limit);

	// get the data for the ids and unique the results bv digest
	let uniquePosts: any = {}
	for (const id of ids) {
		const json = await getTransactionData(id);
		uniquePosts[json.originalDigest] = json;
	}

	// return just an array of the post objects, not the table indexed by digests
	const posts: any[] = Object.values(uniquePosts);
	return posts;
}