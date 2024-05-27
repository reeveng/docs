<script lang="ts">
	import { page } from '$app/stores';
	import pointlessEmote from '$lib/images/pointlessEmote.webp';
	import blaEmote from '$lib/images/bla.webp';
	import blasedEmote from '$lib/images/blased.webp';

	export let form;

	const searchParams = new URLSearchParams($page.url.search);
	const email = searchParams.get('email') ?? '';

	const formSuccess: boolean = Boolean(form?.success);
	const formType: string | undefined = form?.type;
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-4 py-12">
	<h1 class="sr-only">Up to date?!</h1>

	<h2
		class="py-4 text-3xl font-bold text-fuchsia-400 md:text-2xl lg:text-3xl dark:text-fuchsia-300"
	>
		Updates please!!!
	</h2>

	<p>
		You like what you read?<br />Consider leaving your email to receive updates, I shall only update
		you in case of new blog posts, unlike all companies on planet earth
		<img
			alt=", emote of a guy smoking, he looks like he has seen it all..."
			src={pointlessEmote}
			width="40"
			class="inline"
		/>.
	</p>

	<form class="flex max-w-md flex-col gap-2" method="POST" action="?/subscribe">
		<input
			required
			placeholder="someRandomEmail@someRandomDomain.someRandomTopLevelDomain"
			name="email"
			type="email"
			class="input input-bordered input-ghost w-full border-fuchsia-400 dark:border-fuchsia-700"
			value={email}
		/>

		{#if form}
			{#if formSuccess === false && formType === 'subscribe'}
				<div role="alert" class="alert alert-error dark:bg-red-700 dark:text-white">
					<img width="40" alt="bla" src={blaEmote} />

					<ul class="list-disc px-4">
						{#each form.messages as message}
							<li>
								{message}
							</li>
						{/each}
					</ul>
				</div>
			{:else if formSuccess && formType === 'subscribe'}
				<div role="alert" class="alert alert-success dark:bg-lime-700 dark:text-white">
					<img width="40" alt="blased" src={blasedEmote} />

					<ul class="px-4">
						{#each form.messages as message}
							<li>
								{message}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}

		<button type="submit" class="btn btn-neutral">Notify me on updates!</button>
	</form>

	<hr class="divider md:my-12" />

	<h2
		class="py-4 text-3xl font-bold text-fuchsia-400 md:text-2xl lg:text-3xl dark:text-fuchsia-300"
	>
		No updates please!
	</h2>

	<p>
		For those wanting to stop receiving updates. Fill in your email below and you will be
		"unsubscribed".
	</p>

	<form class="flex max-w-md flex-col gap-2" method="POST" action="?/unsubscribe">
		<input
			required
			placeholder="someRandomEmail@someRandomDomain.someRandomTopLevelDomain"
			name="email"
			type="email"
			class="input input-bordered input-ghost w-full border-fuchsia-400 dark:border-fuchsia-700"
			value={email}
		/>

		{#if form}
			{#if formSuccess === false && formType === 'unsubscribe'}
				<div role="alert" class="alert alert-error dark:bg-red-700 dark:text-white">
					<img width="40" alt="bla" src={blaEmote} />

					<ul class="list-disc px-4">
						{#each form.messages as message}
							<li>
								{message}
							</li>
						{/each}
					</ul>
				</div>
			{:else if formSuccess && formType === 'unsubscribe'}
				<div role="alert" class="alert alert-success dark:bg-lime-700 dark:text-white">
					<img width="40" alt="blased" src={blasedEmote} />

					<ul class="px-4">
						{#each form.messages as message}
							<li>
								{message}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}

		<button type="submit" class="btn btn-neutral"
			>Leave me alone man, I don't need no updates!</button
		>
	</form>
</div>
