<script lang="ts">
	import { goto } from '$app/navigation';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import SignOutIcon from '$lib/components/icons/SignOutIcon.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { saveUserID } from '$lib/utils/auth';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { ProfileResponse } from '../../api/user/+server';
	import TierList from './TierList.svelte';

	let userID: number = 0;
	let username: string = '';
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.get(`/api/user`)
			.then((resp) => {
				const data: ProfileResponse = resp.data;
				userID = data.data.id;
				username = data.data.username;
				saveUserID(data.data.id);
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onSignOut = () => goto('/auth/sign-out');
</script>

<Head title="Profile" description="User profile." image="" />

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<div class="grid gap-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="text-3xl font-bold">
				{username}
				<span class="subtitle text-xl font-normal" title="user id">— #{userID}</span>
			</div>
			<IconButton title="sign-out" on:click={onSignOut} class="p-1 px-2">
				<SignOutIcon class="h-5 w-5 sm:hidden" />
				<span class="hidden sm:inline-block">Sign-out</span>
			</IconButton>
		</div>
		<Border />
		<TierList {userID} />
	</div>
{/if}
