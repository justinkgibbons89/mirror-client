# mirror-client

[Mirror.xyz](https://mirror.xyz) posts are stored on [Arweave](https://arweave.org) and can be queried directly from there.

## get posts by contributor
posts on arweave have a `Contributor` tag which corresponds to a wallet address, so we can easily get all the posts from a given address:
```javascript
const sartoshiAddress = "0xeD98464BDA3cE53a95B50f897556bEDE4316361c"
const limit = 5
const posts = await getMirrorPostsByContributor(sartoshiAddress, limit);
console.log(posts.map((post: any) => { return post.content.title }));
```

## get a specific post by digest
posts have `Content-Digest` and `Original-Content-Digest` tags. the _original_ content digest identifies a specific "post"; the plain content
digest identifies each stored "commit" to that post. when we query by `Original-Content-Digest`, we get back a sorted list of transactions with the same original digest and different content digests. the first transaction in our list will be the latest version of the post:
```javascript
const originalContentDigest = "GjssNdA6XK7VYynkvwDem3KYwPACSU9nDWpR5rei3hw"
const limit = 1
const posts = await getMirrorPostsByDigest(originalContentDigest, limit);
console.log(posts.map((post: any) => { return post.content.title }));
```
You could also query by `Content-Digest` if you were determined to get a specific version of a post, but this library doesn't currently expose a function for that.

## configuration
by default this library uses [arweave.net](https://arweave.net) as the node and [arweave.net/graphql](https://arweave.net/graphql) as the graphql endpoint for arweave requests. performance/data availability may be improved by using private infrastructure.
