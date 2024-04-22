import type { Likes } from '$lib/types';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load(event: {
	url: { href: string };
	params: {
		slug: string;
	};
	data: Likes;
}) {
	const { params, data } = event;

	// amount of likes
	const { amount } = data;

	let post;

	try {
		post = await import(`../../../../lib/blogPosts/${params.slug}.md`);
	} catch (err) {
		console.error(err);
		error(404, {
			message: "Couldn't find a blog post with this url",
			description: `The specific blog post you were looking for doesn't exist on <a href="${event.url.href}" class="link">this URL</a>. Would you like to go
            to the <a class="link text-fuchsia-600 dark:text-fuchsia-400" href={URLS.BLOG}
                >blog post overview</a
            >? You can view all blog posts there!`
		});
	}

	return {
		slug: params.slug,
		amount,
		content: post.default,
		...post.metadata
	};
}
