<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import InputTextarea from '$lib/components/inputs/InputTextarea.svelte';
	import TierListBoard from '$lib/components/tier-lists/TierListBoard.svelte';
	import TierListOption from '$lib/components/tier-lists/TierListOption.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { getUserID, isLogin } from '$lib/utils/auth';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { TierListResponse, TierListResponseData } from './+page.server';

	export let data: TierListResponse;

	let tierListData: TierListResponseData = data.data;
	let login: boolean = false;
	let editable: boolean = false;
	let editMode: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	isLogin.subscribe((v) => (login = v));

	onMount(() => (editable = data.data.user.id === getUserID()));

	const onSave = (create = true) => {
		loading = true;
		error = '';

		tierListData.id = create ? '' : tierListData.id;

		amatsukazeAxios
			.put(`/api/tier-lists`, tierListData)
			.then((resp) => {
				const newData: TierListResponseData = resp.data.data;
				editMode = false;
				create && goto(`/tier-lists/${newData.id}/${newData.title}`);
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const toggleEdit = () => (editMode = !editMode);
</script>

<Head title="{tierListData.title} Tier-List" description={tierListData.description} />

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

		{#if login}
			<div class="flex items-center justify-end gap-2">
				{#if editMode}
					<div class="text-red-500">{error}</div>
					{#if editable}
						<Button
							color
							class="p-1 px-4 font-medium"
							title="will update the existing data"
							disabled={loading}
							on:click={() => onSave(false)}
						>
							Update
						</Button>
					{/if}
					<Button
						color
						class="p-1 px-4 font-medium"
						title="will create a new tier list"
						disabled={loading}
						on:click={() => onSave(true)}
					>
						Save as New
					</Button>
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
		{/if}
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
	<div class="subtitle text-sm" title={new Date(tierListData.updated_at).toISOString()}>
		{tierListData.user.username} • {new Date(tierListData.updated_at).toISOString().slice(0, 10)}
	</div>
	<TierListBoard bind:data={tierListData.tiers} />
	<TierListOption bind:data={tierListData} />
</div>
