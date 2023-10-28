import { useEffect, useState } from "react";
import { getPostByOriginalDigest } from "../arweave/getPostByOriginalDigest";
import { MirrorPost } from "../arweave/MirrorPost";

export function usePost({ digest }: {
	digest: string
}) {
	const [data, setData] = useState<null | MirrorPost>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<null | any>(null)

	async function getPost() {
		setLoading(true)
		try {
			const post = await getPostByOriginalDigest(digest)
			setData(post)
		} catch (e) {
			setError(e)
		}
		setLoading(false)
	}

	useEffect(() => {
		getPost()
	}, [digest])

	return { data, loading, error }
}