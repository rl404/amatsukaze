<script lang="ts">
	import { page } from '$app/stores';
	import Head from '$lib/components/commons/Head.svelte';

	const status: number = $page.status;
	const message: string = $page.error?.message || '';
</script>

<Head title={status.toString()} description={message} image="" />

<div class="flex h-screen items-center justify-center text-center font-bold">
	<div>
		<h1 class="text-9xl">{status}</h1>
		<h2>{message}</h2>
	</div>
</div>
