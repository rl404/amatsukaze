<script lang="ts">
	import { page } from '$app/stores';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';

	const status: number = $page.status;
	const message: string = $page.error?.message || '';
</script>

<Head title={status.toString()} description={message} image="" />

<div class="flex h-screen">
	<div class="m-auto text-center font-bold">
		<h1 class="text-9xl">
			{status}
		</h1>
		<Border>
			<div class="whitespace-nowrap px-4">
				{message}
			</div>
		</Border>
	</div>
</div>
