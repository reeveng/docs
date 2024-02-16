<script lang="ts">
	import { assignColorClassToPosts } from '$lib/utils/assignColorClassToPosts.js';
	import { findOldestAndNewestPosts } from '$lib/utils/findOldestAndNewestPosts.js';
	import dayjs from 'dayjs';

	export let data;
	const { posts: postLinks } = data;

	const { oldestDate, newestDate } = findOldestAndNewestPosts(
		postLinks.map((postLink) => postLink.post)
	);
</script>

<svelte:head>
	<title>JuiceMitApfelnDrin's Blog</title>
	<meta property="og:title" content={'Blog'} />
</svelte:head>

<h1 class="sr-only">Blog</h1>

{#if postLinks.length > 0}
	<div class="mx-auto max-w-2xl py-12 flex flex-col gap-8">
		{#each postLinks as postLink}
			<a href={`/blog/${postLink.slug}`} class="cursor-pointer relative py-4">
				<article class="">
					<h2
						class={`font-bold text-base md:text-lg lg:text-xl ${assignColorClassToPosts(postLink.post, oldestDate, newestDate)}`}
					>
						{postLink.post.metadata.title}
					</h2>
					<p class="text-sm text-stone-600 dark:text-stone-400">
						{dayjs(postLink.post.metadata.publishedOnDate).format('DD/MM/YYYY')}
					</p>
					<p>{postLink.post.metadata.teaser}</p>
				</article>
			</a>
		{/each}
	</div>
{/if}

<style>
	a::before,
	a::after,
	a article::before,
	a article::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 50ms;
	}

	a::before,
	a::after {
		top: 0;
	}
	a article::before,
	a article::after {
		bottom: 0;
	}

	a:hover::before,
	a article::before {
		right: calc(62% + 5px);
	}
	a:hover::after,
	a article::after {
		left: calc(38% + 5px);
	}
	a:hover article::before,
	a::before {
		right: calc(38% + 5px);
	}
	a:hover article::after,
	a::after {
		left: calc(62% + 5px);
	}

	@media (prefers-color-scheme: dark) {
		a:hover article::after,
		a:hover article::before,
		a:hover::after,
		a:hover::before {
			@apply bg-fuchsia-300 opacity-35;
		}
	}

	@media (prefers-color-scheme: light) {
		a:hover article::after,
		a:hover article::before,
		a:hover::after,
		a:hover::before {
			@apply bg-fuchsia-700 opacity-35;
		}
	}
</style>
