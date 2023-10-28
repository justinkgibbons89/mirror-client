import Arweave from 'arweave';
import ArDB from 'ardb';

export const arweave = Arweave.init({
	host: 'arweave.net',
	port: 443,
	protocol: 'https'
});

export const ardb = new ArDB(arweave);