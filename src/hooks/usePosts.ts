import { useState } from "react";
import { getPostsByContributor } from "../arweave/getPostsByContributor";
import { MirrorPost } from "../arweave/MirrorPost";

export function usePosts({ address, limit }: {
	address: string;
	limit?: number;
}) {
	const [posts, setPosts] = useState<MirrorPost[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any | null>(null);

	async function getPosts() {
		setLoading(true);
		try {
			const response = await getPostsByContributor(address, limit || 25);
			setPosts(response);

		} catch (e: any) {
			setError(e);
			console.error(e);
		}
		setLoading(false);
	}

	return { getPosts, posts, error, loading };
}