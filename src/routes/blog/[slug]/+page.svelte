<script lang="ts">
	import dayjs from 'dayjs';
	import canLike from '$lib/stores/localstorage.js';
	import { browser } from '$app/environment';

	export let data;
	export let form;

	const { amount: likes, title, publishedOnDate, editedOnDate, content: Content } = data;

	const formSuccess = form?.success;
	if (formSuccess) {
		canLike.set(false);
		if (browser) {
			window.scrollTo(0, document.body.scrollHeight);
		}
	}
</script>

<svelte:head>
	<title>{title} | JuiceMitApfelnDrin's Blog</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article class="mx-auto max-w-2xl py-12">
	<h1 class="py-4 text-lg font-bold text-fuchsia-400 md:text-2xl lg:text-3xl dark:text-fuchsia-300">
		{title}
	</h1>

	<p class="mb-8 text-xs text-stone-600 opacity-85 lg:text-sm dark:text-stone-400">
		{#if editedOnDate && publishedOnDate !== editedOnDate}
			Edited on the {dayjs(editedOnDate).format('DD of MMMM YYYY')}
		{:else}
			Published on the {dayjs(publishedOnDate).format('DD of MMMM YYYY')}
		{/if}
	</p>

	<div class="prose prose-base prose-stone lg:prose-lg 2xl:prose-xl dark:prose-invert">
		<Content />
	</div>

	<form method="POST" class="mt-8">
		<button type="submit" class="btn relative rounded-full" title="Likes" disabled={!$canLike}>
			<span aria-hidden="true">❤️ {likes}</span>
			<span class="sr-only">{likes} people liked this blogpost</span>
		</button>
	</form>
</article>

<style>
	/* TODO: add a triangle shape under the button you lazy bum :) */
	button[title]:hover::after {
		@apply absolute left-0 right-0 top-0 mt-[-2rem] w-full rounded-full bg-white p-1;

		content: attr(title);
	}
</style>
