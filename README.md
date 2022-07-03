# mirror-client

[Mirror.xyz](https://mirror.xyz) posts are stored on [Arweave](https://arweave.org) and can be queried directly from there.

## get posts by contributor
posts on arweave have a `Contributor` tag which corresponds to a wallet address, so we can easily get all the posts from a given address:
```javascript
const sartoshiAddress = "0xeD98464BDA3cE53a95B50f897556bEDE4316361c"
const limit = 5
const posts = await getMirrorPosts(sartoshiAddress, limit);
console.log(posts.map((post: any) => { return post.content.title }));
```

## get a specific post by digest
posts have `Content-Digest` and `Original-Content-Digest` tags. the original digest identifies a specific "post", the content
digest identifies each stored "commit" to that post. when we query by original content digest, we get back a sorted list of posts. 
the first item will be the latest version:
```javascript
const originalContentDigest = "GjssNdA6XK7VYynkvwDem3KYwPACSU9nDWpR5rei3hw"
const limit = 1
const posts = await getMirrorPostsByDigest(originalContentDigest, limit);
console.log(posts.map((post: any) => { return post.content.title }));
```

## configuration
by default this library uses [arweave.net](https://arweave.net) as the node and [arweave.net/graphql](https://arweave.net/graphql) as the graphql endpoint for arweave requests. performance/data availability may be improved by using private infrastructure.
