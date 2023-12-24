<script lang="ts">
	import { goto } from '$app/navigation';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { generateOauthURL, getAccessToken } from '$lib/utils/auth';
	import { onMount } from 'svelte';

	let loading: boolean = true;

	onMount(() => {
		if (getAccessToken()) {
			goto('/profile');
			return;
		}
		goto(generateOauthURL());
	});
</script>

<Head title="Sign-In" description="User sign-in." />

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{/if}
