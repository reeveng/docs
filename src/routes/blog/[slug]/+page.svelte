<script lang="ts">
	import dayjs from 'dayjs';

	export let data;

	const { title, publishedOnDate, editedOnDate, content: Content } = data;
</script>

<svelte:head>
	<title>{title} | JuiceMitApfelnDrin's Blog</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article class="mx-auto max-w-2xl py-12">
	<h1 class="font-bold text-lg py-4 md:text-2xl lg:text-3xl text-fuchsia-400">{title}</h1>

	<p class="text-xs lg:text-sm text-stone-600 dark:text-stone-400 mb-8 opacity-85">
		{#if editedOnDate && publishedOnDate !== editedOnDate}
			Edited on the {dayjs(editedOnDate).format('DD of MMMM YYYY')}
		{:else}
			Published on the {dayjs(publishedOnDate).format('DD of MMMM YYYY')}
		{/if}
	</p>

	<div class="prose prose-stone prose-base lg:prose-lg 2xl:prose-xl dark:prose-invert">
		<Content />
	</div>
</article>
