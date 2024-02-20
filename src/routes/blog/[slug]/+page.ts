import type { Likes } from '$lib/types';
import { error } from '@sveltejs/kit';

export const prerender = false

export async function load(event: {
    url: { href: string };
    params: {
        slug: string;
    },
    data: Likes
}) {
    const { params, data } = event;

    // amount of likes
    const { amount } = data;

    let post;

    try {
        post = await import(`../${params.slug}.md`);
    } catch {
        error(404, {
            message: "Couldn't find a blogpost with this url",
            description: `The specific blogpost you were looking for doesn't exist on <a href="${event.url.href}" class="link">this URL</a>. Would you like to go
            to the <a class="link text-fuchsia-600 dark:text-fuchsia-400" href={URLS.BLOG}
                >blogpost overview</a
            >? You can view all blogposts there!`
        })
    }

    return {
        slug: params.slug,
        amount,
        content: post.default,
        ...post.metadata
    };
}