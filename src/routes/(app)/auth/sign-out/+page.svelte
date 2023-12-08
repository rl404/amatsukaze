<script lang="ts">
	import { goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { getAxiosError } from '$lib/utils';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { deleteStorage } from '$lib/utils/oauth';
	import { onMount } from 'svelte';

	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.post(`/api/auth/logout`)
			.then(() => {
				deleteStorage();
				goto('/');
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<Head title="Sign-Out" description="User sign-out." />

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{/if}

{#if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{/if}
