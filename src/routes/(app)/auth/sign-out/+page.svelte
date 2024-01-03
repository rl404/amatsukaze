<script lang="ts">
	import { goto } from '$app/navigation';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { deleteStorage, isLogin } from '$lib/utils/auth';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';

	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.post(`/api/auth/logout`)
			.then(() => {
				isLogin.set(false);
				deleteStorage();
				goto('/');
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<Head title="Sign-Out" description="User sign-out." image="" />

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{/if}
