export * from './hooks/usePosts';
export * from './arweave/MirrorPost';
export * from './hooks/usePost';
export * from './arweave/getPostByOriginalDigest';
export * from './arweave/getPostsByContributor';
export * from './arweave/indexBlocks';

// async function main() {
// 	console.log('testing...');
// 	const posts = await indexBlocks(1305100, 1305150)
// 	// for (const post of posts) {
// 	// 	console.log(post.content.title)
// 	// }
// 	console.log("done.")
// }

// main()