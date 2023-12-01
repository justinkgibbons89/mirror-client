/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\tquery MirrorPostsByContrib($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Contributor\",\n        \t\t\tvalues: [$address]\n      \t\t\t}\n    \t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t": types.MirrorPostsByContribDocument,
    "\n\t\tquery MirrorPostsByBlock($startHeight: Int!, $endHeight: Int, $first: Int, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t}\n    \t\t], \n\t\t\t\tsort: HEIGHT_ASC, \n\t\t\t\tfirst: $first, \n\t\t\t\tafter: $after,\n\t\t\t\tblock: { min: $startHeight, max: $endHeight }\n\t\t\t) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t": types.MirrorPostsByBlockDocument,
    "\n\t\tquery MirrorPostsByDigest($originalDigest: String!) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Original-Content-Digest\",\n        \t\t\tvalues: [$originalDigest]\n      \t\t\t}\n    \t\t], sort: HEIGHT_DESC) {\n        \tedges {\n        \tnode {\n            \tid\n\t\t\t\tblock {\n\t\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t\ttags {\n\t\t\t\t\tname\n\t\t\t\t\tvalue\n\t\t\t\t}\n        \t}\n        \t}\n    \t}\n\t}\n\t": types.MirrorPostsByDigestDocument,
    "\n\tquery GetTxnsForContributor($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n\t\ttransactions(tags: [\n\t\t\t{ \n\t\t\t\tname: \"App-Name\",\n\t\t\t\tvalues: [\"MirrorXYZ\"]\n\t\t\t},\n\t\t\t{\n\t\t\t\tname: \"Contributor\",\n\t\t\t\tvalues: [$address]\n\t\t\t}\n\t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t__typename\n\t\t\tpageInfo {\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tblock {\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\theight\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvalue\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetTxnsForContributorDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery MirrorPostsByContrib($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Contributor\",\n        \t\t\tvalues: [$address]\n      \t\t\t}\n    \t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t"): (typeof documents)["\n\t\tquery MirrorPostsByContrib($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Contributor\",\n        \t\t\tvalues: [$address]\n      \t\t\t}\n    \t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery MirrorPostsByBlock($startHeight: Int!, $endHeight: Int, $first: Int, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t}\n    \t\t], \n\t\t\t\tsort: HEIGHT_ASC, \n\t\t\t\tfirst: $first, \n\t\t\t\tafter: $after,\n\t\t\t\tblock: { min: $startHeight, max: $endHeight }\n\t\t\t) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t"): (typeof documents)["\n\t\tquery MirrorPostsByBlock($startHeight: Int!, $endHeight: Int, $first: Int, $after: String) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t}\n    \t\t], \n\t\t\t\tsort: HEIGHT_ASC, \n\t\t\t\tfirst: $first, \n\t\t\t\tafter: $after,\n\t\t\t\tblock: { min: $startHeight, max: $endHeight }\n\t\t\t) {\n\t\t\t\tpageInfo {\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tedges {\n\t\t\t\t\tcursor\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tblock {\n\t\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n        \t}\n    \t}\n\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery MirrorPostsByDigest($originalDigest: String!) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Original-Content-Digest\",\n        \t\t\tvalues: [$originalDigest]\n      \t\t\t}\n    \t\t], sort: HEIGHT_DESC) {\n        \tedges {\n        \tnode {\n            \tid\n\t\t\t\tblock {\n\t\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t\ttags {\n\t\t\t\t\tname\n\t\t\t\t\tvalue\n\t\t\t\t}\n        \t}\n        \t}\n    \t}\n\t}\n\t"): (typeof documents)["\n\t\tquery MirrorPostsByDigest($originalDigest: String!) {\n  \t\t\ttransactions(tags: [\n      \t\t\t{ \n        \t\t\tname: \"App-Name\",\n        \t\t\tvalues: [\"MirrorXYZ\"]\n      \t\t\t},\n      \t\t\t{\n        \t\t\tname: \"Original-Content-Digest\",\n        \t\t\tvalues: [$originalDigest]\n      \t\t\t}\n    \t\t], sort: HEIGHT_DESC) {\n        \tedges {\n        \tnode {\n            \tid\n\t\t\t\tblock {\n\t\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t\ttags {\n\t\t\t\t\tname\n\t\t\t\t\tvalue\n\t\t\t\t}\n        \t}\n        \t}\n    \t}\n\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTxnsForContributor($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n\t\ttransactions(tags: [\n\t\t\t{ \n\t\t\t\tname: \"App-Name\",\n\t\t\t\tvalues: [\"MirrorXYZ\"]\n\t\t\t},\n\t\t\t{\n\t\t\t\tname: \"Contributor\",\n\t\t\t\tvalues: [$address]\n\t\t\t}\n\t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t__typename\n\t\t\tpageInfo {\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tblock {\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\theight\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvalue\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTxnsForContributor($address: String!, $first: Int, $sort: SortOrder, $after: String) {\n\t\ttransactions(tags: [\n\t\t\t{ \n\t\t\t\tname: \"App-Name\",\n\t\t\t\tvalues: [\"MirrorXYZ\"]\n\t\t\t},\n\t\t\t{\n\t\t\t\tname: \"Contributor\",\n\t\t\t\tvalues: [$address]\n\t\t\t}\n\t\t], sort: $sort, first: $first, after: $after) {\n\t\t\t__typename\n\t\t\tpageInfo {\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tblock {\n\t\t\t\t\t\ttimestamp\n\t\t\t\t\t\theight\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvalue\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;