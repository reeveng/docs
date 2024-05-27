<script lang="ts">
	import WordCloud from '$lib/components/WordCloud.svelte';
	import canAddWords from '$lib/stores/canAddWords';
	import { onDestroy } from 'svelte';

	export let form;
	export let data: { allWords: { word: string; amount: number }[] };

	const formSuccess = Boolean(form?.success);
	const formAllWords = data?.allWords ?? [];

	let width: number;
	let height: number;

	let userCanAddWords = false;

	if (formSuccess) {
		canAddWords.set(false);
	}

	const unsubscribe = canAddWords.subscribe((value) => {
		userCanAddWords = value;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if userCanAddWords}
	<div>
		<h1
			class="py-4 text-lg font-bold text-fuchsia-400 md:text-2xl lg:text-3xl dark:text-fuchsia-300"
		>
			Describe me:
		</h1>

		<div class="my-2">
			<p>Please add 3 words to describe me (letters only "a-zA-Z"):</p>
			<a
				class="sub text-blue-500 underline"
				href="https://apple.stackexchange.com/questions/364909/technical-reason-why-safari-9-doesnt-support-modern-sites"
			>
				<sub>There are known issues with safari, please use a different web browser.</sub>
			</a>
		</div>

		<form class="flex max-w-md flex-col gap-2" method="POST" action="?/add">
			<input
				class="input input-bordered input-ghost w-full border-fuchsia-400 dark:border-fuchsia-700"
				type="text"
				id="word1"
				pattern="[a-zA-Z]+"
				name="word1"
				placeholder="word1"
				required
			/>

			<input
				class="input input-bordered input-ghost w-full border-fuchsia-400 dark:border-fuchsia-700"
				type="text"
				pattern="[a-zA-Z]+"
				id="word2"
				name="word2"
				placeholder="word2"
				required
			/>

			<input
				class="input input-bordered input-ghost w-full border-fuchsia-400 dark:border-fuchsia-700"
				type="text"
				id="word3"
				pattern="[a-zA-Z]+"
				name="word3"
				placeholder="word3"
				required
			/>

			<button class="btn btn-neutral" type="submit">Add my words!</button>
		</form>

		{#if form && form.messages && formSuccess === false}
			<div role="alert" class="alert alert-error dark:bg-red-700 dark:text-white">
				<ul class="list-disc px-4">
					{#each form.messages as message}
						<li>
							{message}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{:else}
	<h1 class="py-4 text-lg font-bold text-fuchsia-400 md:text-2xl lg:text-3xl dark:text-fuchsia-300">
		So far you and others have described me as:
	</h1>

	<div bind:offsetHeight={height} bind:offsetWidth={width}>
		<WordCloud {width} {height} wordsWithAmount={formAllWords}></WordCloud>
	</div>
{/if}
