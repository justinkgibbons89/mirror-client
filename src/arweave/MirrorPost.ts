export type MirrorPost = {
	// uniquely identifies this version of the post
	digest: string;
	// uniquely identifies the original post
	originalDigest: string;
	txnId?: string;
	version: string;
	nft: any,
	// the author of the post
	authorship: {
		// proof of ownership
		signature: string;
		// the author's wallet address
		contributor: string;
	}
	content: {
		title: string;
		body: string;
		timestamp: number;
	};
}