import { TypedDocumentNode } from "@apollo/client"
import request, { RequestDocument, Variables } from "graphql-request"
import { ArweaveGraphQLEndpoint } from "../constants"

export async function paginate<T, V extends Variables = Variables>(node: RequestDocument | TypedDocumentNode<T, V>, variables: Variables | undefined, handler: (data: T) => Promise<string | undefined>) {
	let cursor: string | null | undefined = null
	let url = ArweaveGraphQLEndpoint

	while (cursor !== undefined) {
		const response = await request<T>(url, node, { ...variables, after: cursor })
		cursor = await handler(response)
	}
}

export async function fetchMore<T, V extends Variables = Variables>(node: RequestDocument | TypedDocumentNode<T, V>, variables: Variables | undefined, findCursor: (data: T) => string | undefined) {
	let url = ArweaveGraphQLEndpoint
	const response = await request<T>(url, node, { ...variables })
	let cursor = findCursor(response)

	async function next() {
		return fetchMore(node, { ...variables, after: cursor }, findCursor)
	}
	return { response, hasNextPage: cursor ? true : false, next }
}