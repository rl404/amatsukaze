<script lang="ts">
	import { page } from '$app/stores';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';

	const status: number = $page.status;
	const message: string = $page.error?.message || '';
</script>

<Head title={status.toString()} description={message} />

<div class="flex h-screen">
	<div class="m-auto text-center font-bold ">
		<h1 class="text-9xl">{status}</h1>
		<Border><span class="px-4 whitespace-nowrap">{message}</span></Border>
	</div>
</div>
