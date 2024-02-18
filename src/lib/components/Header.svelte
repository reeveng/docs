<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	const links = writable([
		{ path: '/', name: 'Home', isCurrent: false },
		{ path: '/blog', name: 'Blog', isCurrent: false }
	]);

	// Subscribe to changes in the $page store
	page.subscribe(($page) => {
		function isCurrentOrChildPage(path: string, name: string): boolean {
			return Boolean(
				($page.url.pathname.startsWith(path) && name !== 'Home') || path === $page.url.pathname
			);
		}

		// Update isCurrent property for each link
		links.update((currentLinks) => {
			return currentLinks.map((link) => ({
				...link,
				isCurrent: isCurrentOrChildPage(link.path, link.name)
			}));
		});
	});
</script>

<header>
	<div class="corner">
		<!-- <a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a> -->
	</div>

	<nav class="fill-slate-800 font-mono font-bold">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="bg-slate-800 px-12 dark:bg-slate-800">
			{#each $links as { isCurrent, name, path }}
				<li
					aria-current={isCurrent ? 'page' : undefined}
					class={`transition motion-reduce:transition-none
					${
						isCurrent
							? 'border-fuchsia-400 text-fuchsia-400 hover:border-fuchsia-400 hover:text-fuchsia-600 dark:border-fuchsia-600'
							: 'text-fuchsia-100 hover:text-fuchsia-600'
					}`}
				>
					<a href={path}>{name}</a>
				</li>
			{/each}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- <a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a> -->
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	/* .corner {
		width: 3em;
		height: 3em;
	} */

	/* .corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	} */

	/* .corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	} */

	nav {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2rem;
		height: 3rem;
		display: block;
	}

	ul {
		position: relative;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>
