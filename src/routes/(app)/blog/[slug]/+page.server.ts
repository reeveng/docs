import { BLOG_POST, getDB } from '$lib/db/mongo';
import type { Actions } from './$types';

export const actions = {
	default: async (event: { params: { slug: string } }) => {
		const slugId = event.params.slug;

		try {
			await getDB()
				.collection(BLOG_POST)
				.updateOne(
					{ slug: slugId }, // Filter for specific blog post
					{ $inc: { amount: 1 } }, // Increment amount field by 1
					{ upsert: true } // Create new if not found
				);
		} catch (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true, slug: slugId };
	}
} satisfies Actions;

export async function load(event: { params: { slug: string } }) {
	const slugId = event.params.slug;

	try {
		const currentOpenedBlogPost = await getDB()
			.collection(BLOG_POST)
			.findOne({ slug: slugId }, { projection: { amount: 1, _id: 0 } });

		return {
			amount: currentOpenedBlogPost?.amount ?? 0
		};
	} catch (error) {
		console.error(error);
		return {
			amount: 0
		};
	}
}
