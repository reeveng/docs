<script>
	import '../app.pcss';
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<div
	class="app bg-gradient-to-t from-fuchsia-300 to-white text-stone-800 dark:from-fuchsia-950 dark:to-black dark:text-neutral-200"
>
	<Header></Header>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
