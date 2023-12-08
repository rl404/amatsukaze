<script lang="ts">
	import { goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { profileResponse } from '../../api/user/+server';
	import { getAxiosError } from '$lib/utils';
	import Border from '$lib/components/Border.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import SignOutIcon from '$lib/components/icons/SignOutIcon.svelte';
	import TierList from './TierList.svelte';
	import { saveUserID } from '$lib/utils/oauth';

	let userID: number = 0;
	let username: string = '';
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.get(`/api/user`)
			.then((resp) => {
				const data: profileResponse = resp.data;
				userID = data.data.id;
				username = data.data.username;
				saveUserID(data.data.id);
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});

	const onSignOut = () => goto('/auth/sign-out');
</script>

<Head title="Profile" description="User profile." />

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<div class="grid grid-cols-1 gap-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<span class="text-3xl font-bold">
				{username}
				<span class="text-xl font-normal opacity-70 hover:opacity-100" title="user id">— #{userID}</span>
			</span>
			<span>
				<IconButton title="sign-out" on:click={onSignOut} class="gap-1">
					<SignOutIcon class="w-5 h-5 sm:hidden" />
					<span class="hidden sm:inline-block">Sign-out</span>
				</IconButton>
			</span>
		</div>
		<Border />
		<TierList {userID} />
	</div>
{/if}
