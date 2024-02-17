<script lang="ts">
	import dayjs from 'dayjs';

	export let data;

	const { title, publishedOnDate, editedOnDate, content: Content } = data;

	/**
	 * TODO: make a section where people can like a blogpost later on, only like, no dislike, cus fuck people, we dont really care about bad opinions
	 */
</script>

<svelte:head>
	<title>{title} | JuiceMitApfelnDrin's Blog</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article class="mx-auto max-w-2xl py-12">
	<h1 class="py-4 text-lg font-bold text-fuchsia-400 md:text-2xl lg:text-3xl">{title}</h1>

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
</article>
