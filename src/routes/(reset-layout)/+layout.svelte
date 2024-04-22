<script>
	import '../../app.pcss';
	import '../styles.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<div
	class="app bg-gradient-to-t from-fuchsia-300 to-white text-stone-800 dark:from-fuchsia-950 dark:to-black dark:text-neutral-200"
>
	<main class="mx-auto box-border flex w-full max-w-5xl flex-1 flex-col p-4">
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
