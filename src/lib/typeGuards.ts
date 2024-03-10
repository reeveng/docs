import type { Post, PostInformation, PostLink } from '$lib/types';

function generateIsPost<T>(keys: (keyof T)[]): (data: unknown) => data is T {
	return function isPost(data: unknown): data is T {
		if (typeof data !== 'object' || data === null) {
			return false;
		}

		return keys.every((key) => key in data);
	};
}

export const isPost = generateIsPost<Post>(['metadata']);
export const isPostLink = generateIsPost<PostLink>(['slug', 'post']);
export const isPostInformation = generateIsPost<PostInformation>([
	'title',
	'publishedOnDate',
	'teaser',
	'description',
	'amount',
	'content'
]);
