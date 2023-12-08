<script lang="ts">
	import { goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { generateOauthURL, getAccessToken } from '$lib/utils/oauth';
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
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{/if}
