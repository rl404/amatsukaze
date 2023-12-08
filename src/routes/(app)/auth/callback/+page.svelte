<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Head from '$lib/components/Head.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { getAxiosError } from '$lib/utils';
	import { deleteState, saveAccessToken, saveRefreshToken, validateState } from '$lib/utils/oauth';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { callbackResponse } from '../../../api/auth/callback/+server';

	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		const state = $page.url.searchParams.get('state') || '';
		const code = $page.url.searchParams.get('code') || '';

		if (state === '' || code === '' || !validateState(state)) {
			goto('/');
			return;
		}

		axios
			.post(`/api/auth/callback`, { code: code })
			.then((resp) => {
				const data: callbackResponse = resp.data;

				saveAccessToken(data.data.access_token);
				saveRefreshToken(data.data.refresh_token);
				deleteState();

				goto('/profile');
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<Head title="Auth Callback" description="Auth callback." />

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{/if}

{#if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{/if}
