<script lang="ts">
	import { onMount } from 'svelte';
	import d3Cloud from 'd3-cloud';
	import { descending, rollups } from 'd3-array';

	export let wordsWithAmount: { word: string; amount: number }[] = [];
	export let height = 600;
	export let width = 840;

	let words:
		| string[]
		| {
				size?: number;
				x?: number;
				y?: number;
				rotate?: number;
				text?: string;
		  }[] = [];
	let dimensions = {
		width: width,
		height: height,
		margin: {
			top: 24,
			right: 0,
			bottom: 0,
			left: 0
		}
	};

	onMount(() => {
		if (typeof document !== 'undefined') {
			const data = wordsWithAmount
				.sort(({ amount: amountA }, { amount: amountB }) => descending(amountA, amountB))
				.map(({ word, amount }) => ({ text: word, size: amount }));

			const wordPadding = 2;

			const cloudWords: {
				size?: number;
				x?: number;
				y?: number;
				rotate?: number;
				text?: string;
			}[] = [];

			const cloud = d3Cloud()
				.size([
					dimensions.width - dimensions.margin.left - dimensions.margin.right,
					dimensions.height - dimensions.margin.top - dimensions.margin.bottom
				])
				.words(data)
				.padding(wordPadding)
				.rotate(0)
				.font('Helvetica')
				.fontSize((d) => Math.sqrt(Number(d.size)) * 20)
				.on('word', ({ size, x, y, rotate, text }) =>
					cloudWords.push({ size, x, y, rotate, text })
				);

			cloud.start();

			words = cloudWords;
		}
	});
</script>

<svg
	width={dimensions.width}
	height={dimensions.height}
	viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
	text-anchor="middle"
	font-family="Helvetica"
>
	<g transform={`translate(0 ${dimensions.margin.top})`}>
		{#each words as word}
			{#if word && typeof word === 'object'}
				<text
					font-size={word.size}
					transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
					class="fill-fuchsia-700 dark:fill-fuchsia-200">{word.text}</text
				>
			{/if}
		{/each}
	</g>
</svg>
