import { getMirrorPostsByContributor, getMirrorPostsByDigest } from '../getPosts';

describe("get mirror posts", () => {
	jest.setTimeout(60000);
	test('get posts by digest', async () => {
		const originalContentDigest = "GjssNdA6XK7VYynkvwDem3KYwPACSU9nDWpR5rei3hw"
		const limit = 1

		const posts = await getMirrorPostsByDigest(originalContentDigest, limit);
		console.log(posts[0]);
		expect(posts[0].digest).toBe("SZ3uJdUzsN84mgFegfpWadXXdGyMN8c82dDdeQ2Hqo8");
		expect(posts[0].authorship.signature).toBe("WulpvqP7BUZNdYDhmIrdwInBmdpm2Z05LtL982-0SfYiYSfgsdkuJjDN6_V5_GsC2AWsUwP9_E6VE5huSHxW2g");
		expect(posts[0].authorship.contributor).toBe("0xbDc4199575A5FA3F19e9888C5d51Bde798F404Cc");
		expect(posts[0].content.title).toBe("Retrieving posts directly from Arweave")
	})
})