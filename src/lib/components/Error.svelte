<script lang="ts">
	import { page } from '$app/stores';
	import { URLS } from '$lib/utils/urls';
	import picture404 from '$lib/images/404Picture.jpg';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="card flex w-96 shadow-xl shadow-fuchsia-400 dark:shadow-fuchsia-900">
		<figure class="px-10 pt-10">
			<img
				src={picture404}
				alt="by J. MAD, of two people holding up peace signs hugging each other, whilst looking off into the sunset"
				class="rounded-xl"
			/>
		</figure>
		<div class="card-body items-center text-center">
			<h1
				class="py-4 text-lg font-bold text-fuchsia-500 md:text-2xl lg:text-3xl dark:text-fuchsia-300"
			>
				{$page.status}:
				{$page.error?.message ?? 'Not found'}
			</h1>

			<p>
				{@html $page.error?.description ??
					`Whatever you were looking for doesn't exist on this URL. Would you like to go
                to the <a class="link text-fuchsia-600 dark:text-fuchsia-400" href={URLS.ROOT}
                    >home page</a
                >?`}
			</p>
		</div>
	</div>
</div>
