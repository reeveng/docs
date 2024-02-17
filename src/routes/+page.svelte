<script lang="ts">
	import Youtube from '../lib/images/brands/youtube.svelte';
	import Gmail from '../lib/images/brands/gmail.svelte';
	import Patreon from '../lib/images/brands/patreon.svelte';
	import Github from '../lib/images/brands/github.svelte';
	import Twitch from '../lib/images/brands/twitch.svelte';
	import Discord from '../lib/images/brands/discord.svelte';
	import Dribbble from '../lib/images/brands/dribbble.svelte';
	import Pexels from '../lib/images/brands/pexels.svelte';
	import OnlyFans from '../lib/images/brands/onlyfans.svelte';
	// import Logo from '../lib/images/logo.svelte';

	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import githubTheme from 'svelte-highlight/styles/github-dark-dimmed';

	const code = `type Status = {
	job: string;
	goal: string;
}

const statusObj: Status = {
	job: "Doing the thing with the code and the editor.",
	goal: "Aiming to improve the world around us."
}`;
</script>

<svelte:head>
	{@html githubTheme}

	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<!-- 
<div class="mt-12 flex items-center justify-center">
	<Logo />
</div> -->

<h1 class="my-32 flex items-center justify-center text-6xl md:text-8xl">
	<abbr class="textThing" title="Juice mit apfeln drin">J MAD</abbr>
</h1>

<div class="md:mx-8 md:py-8">
	<Highlight language={typescript} {code} />
</div>

<div class="my-8 flex items-center justify-center pt-8">
	<div class="socials">
		<a href="https://github.com/reeveng" target="_blank" rel="noopener noreferrer nofollow">
			<Github />
			<span class="sr-only"
				>Link to github, site where you can check out some of my coding projects</span
			>
		</a>
		<a
			target="_blank"
			href="https://www.twitch.tv/juicemitapfelndrin/"
			rel="noopener noreferrer nofollow"
		>
			<Twitch />
			<span class="sr-only">Link to twitch, sometimes I live stream on twitch</span>
		</a>
		<a href="https://discord.gg/n9Md43S8Yb" target="_blank" rel="noopener noreferrer nofollow">
			<Discord />
			<span class="sr-only">Link to discord, a site where you can join me and my community</span>
		</a>
		<a
			href="https://www.pexels.com/@juicemitapfelndrin"
			target="_blank"
			rel="noopener noreferrer nofollow"
		>
			<Pexels />
			<span class="sr-only"
				>Link to my photography website, a place on the web where I share photos</span
			>
		</a>
		<a
			href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			target="_blank"
			rel="noopener noreferrer nofollow"
		>
			<OnlyFans />
			<span class="sr-only">Link to my instagram, a place on the web where I share photos</span>
		</a>
		<a href="https://dribbble.com/reeveng" target="_blank" rel="noopener noreferrer nofollow">
			<Dribbble />
			<span class="sr-only">Link to dribble, a site where designs can be uploaded and shared</span>
		</a>
		<a
			href="https://patreon.com/juicemitapfelndrin"
			target="_blank"
			rel="noopener noreferrer nofollow"
		>
			<Patreon />
			<span class="sr-only">
				Link to patreon, a site where you can support me and other creators
			</span>
		</a>
		<a
			href="mailto:juicemitapfelndrin@gmail.com"
			target="_blank"
			rel="noopener noreferrer nofollow"
		>
			<Gmail />
			<span class="sr-only">Opens a mail client, so you can send me an email</span>
		</a>
		<a
			href="https://www.youtube.com/@juicemitapfelndrin"
			target="_blank"
			rel="noopener noreferrer nofollow"
		>
			<Youtube />
			<span class="sr-only">Link to youtube, so you can view videos that I make</span>
		</a>
	</div>
</div>

<style>
	.textThing {
		/* border-bottom: 1px solid currentColor; */
		text-decoration: none;
	}

	.socials {
		/* bento */
		/* @apply bg-stone-500 p-4; */

		list-style: none;
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(9, minmax(0, 1fr));
		max-width: 65%;
		align-self: center;
		justify-self: center;
		position: relative;
	}

	/* bento */
	/* .socials::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: rgb(59, 59, 59);
		height: 2rem;
		bottom: -2rem;
		border-bottom-left-radius: 25%;
		border-bottom-right-radius: 25%;
	} */

	.socials a {
		/* bento */
		/* @apply bg-red-500 p-4; */

		border-radius: 50%;
		text-align: center;
		transition: all 0.25s ease;
		height: 1.5rem;
		width: 1.5rem;
	}

	@media only screen and (max-width: 767px) {
		.socials {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media only screen and (max-width: 300px) {
		.socials {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
