<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import {
		deleteState,
		isLogin,
		saveAccessToken,
		saveRefreshToken,
		validateState
	} from '$lib/utils/auth';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { CallbackResponse } from '../../../api/auth/callback/+server';

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
				const data: CallbackResponse = resp.data;

				saveAccessToken(data.data.access_token);
				saveRefreshToken(data.data.refresh_token);
				deleteState();

				isLogin.set(true);
				goto('/profile');
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<Head title="Auth Callback" description="Auth callback." image="" />

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{/if}
