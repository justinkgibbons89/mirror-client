import { ArweaveCDN, OriginalDigestTag } from "../constants";
import { MirrorPost } from "./MirrorPost";
import { getTag } from "./getTransactionMetadata";

// Gets Arweave transaction data for the given transaction ID
export const getTransactionData = async (id: string) => {
	const contentDomain = ArweaveCDN
	const endpoint = `${contentDomain}/${id}`

	console.log("Fetching ", `${contentDomain}/${id}`);

	const response = await fetch(`${contentDomain}/${id}`)
		.then(res => res.json())

	return response
}

export async function getTransactionAsMirrorPost({ digest }: {
	digest: string
}): Promise<MirrorPost> {
	const contentDomain = ArweaveCDN
	const response = await fetch(`${contentDomain}/${digest}`)
		.then(res => res.json())
	const originalDigest = getTag(response, OriginalDigestTag)

	if (originalDigest) {
		response.originalDigest = originalDigest
		return response;
	}

	throw new Error('No original digest found')
}