<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import InputTextarea from '$lib/components/inputs/InputTextarea.svelte';
	import TierListBoard from '$lib/components/tier-lists/TierListBoard.svelte';
	import TierListOption from '$lib/components/tier-lists/TierListOption.svelte';
	import { defaultTierList } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { deleteTierList, getTierList, isLogin, saveTierList } from '$lib/utils/auth';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { TierListResponseData } from '../[id]/[...title]/+page.server';

	let tierListData: TierListResponseData = { ...defaultTierList };
	let isReady: boolean = false;
	let login: boolean = false;
	let editMode: boolean = true;
	let loading: boolean = false;
	let error: string = '';

	$: tierListData, browser && isReady && saveTierList(tierListData);

	isLogin.subscribe((v) => (login = v));

	onMount(() => {
		tierListData = getTierList();
		isReady = true;
	});

	const onSave = () => {
		loading = true;
		error = '';

		tierListData.updated_at = new Date().toISOString();

		amatsukazeAxios
			.put(`/api/tier-lists`, tierListData)
			.then((resp) => {
				const newData: TierListResponseData = resp.data.data;
				deleteTierList();
				goto(`/tier-lists/${newData.id}/${newData.title}`);
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const toggleEdit = () => (editMode = !editMode);
</script>

<Head title="New Tier-List" description="Create a new tier list." image="" />

{#if !isReady}
	<div><Loading class="h-8 w-8" /></div>
{:else}
	<div class="grid gap-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<h1 class="flex items-center gap-2 text-3xl font-bold">
				{#if editMode}
					<InputText
						bind:value={tierListData.title}
						placeholder="Title"
						disabled={loading}
						class="w-full"
					/>
				{:else}
					<span>{tierListData.title}</span>
				{/if}
				<span class="subtitle pointer-events-none whitespace-nowrap">Tier-List</span>
			</h1>

			<div class="flex items-center justify-end gap-2">
				{#if editMode}
					<div class="text-red-500">{error}</div>
					{#if login}
						<Button
							color
							class="p-1 px-4 font-medium"
							title="will create a new tier list"
							disabled={loading}
							on:click={onSave}
						>
							Save as New
						</Button>
					{:else}
						<a href="/auth/sign-in">
							<Button class="p-1 px-4 font-medium">Sign-in to Save</Button>
						</a>
					{/if}
					<Button class="p-1 px-4 font-medium" on:click={toggleEdit}>Cancel</Button>
				{:else}
					<Button
						color
						class="p-1 px-4 font-medium"
						title="edit the tier list"
						on:click={toggleEdit}
					>
						Edit
					</Button>
				{/if}
			</div>
		</div>
		<Border />
		<div class="whitespace-pre">
			{#if editMode}
				<InputTextarea
					bind:value={tierListData.description}
					placeholder="tier list description..."
					rows={5}
					class="w-full"
				/>
			{:else}
				{tierListData.description}
			{/if}
		</div>
		<TierListBoard bind:data={tierListData.tiers} />
		<TierListOption bind:data={tierListData} />
	</div>
{/if}
