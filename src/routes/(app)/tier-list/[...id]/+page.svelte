<script lang="ts">
	import { goto } from '$app/navigation';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { getAxiosError } from '$lib/utils';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { tierListResponse } from '../../../api/tier-lists/+server';
	import type { TierList, tierListAgencyResponse } from './+page.server';
	import Board from './Board.svelte';
	import List from './List.svelte';
	import { getUserID } from '$lib/utils/oauth';
	import LockIcon from '$lib/components/icons/LockIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import InputTextArea from '$lib/components/inputs/InputTextArea.svelte';

	export let data: tierListAgencyResponse;

	let editable: boolean = false;
	let editMode: boolean = false;
	let updateable: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	const tierData: TierList = {
		id: data.tier.data.id,
		title: data.tier.data.title,
		description: data.tier.data.description,
		tiers: data.tier.data.tiers.map((d, i) => ({
			id: data.tier.data.id + i,
			label: d.label,
			description: d.description,
			color: d.color,
			size: d.size,
			vtubers: d.vtubers.map((v) => ({
				id: v.id,
				name: v.name,
				image: v.image,
				description: v.description,
				isDndShadowItem: false
			}))
		})),
		options: data.tier.data.options.map((v) => ({
			id: v.id,
			name: v.name,
			image: v.image,
			description: v.description,
			isDndShadowItem: false
		})),
		user: {
			id: data.tier.data.user.id,
			username: data.tier.data.user.username
		},
		updatedAt: new Date(data.tier.data.updated_at)
	};

	onMount(() => {
		const userID = getUserID();
		if (!userID) return;

		editable = true;
		if (userID === tierData.user.id) updateable = true;
	});

	const onSave = (create = true) => {
		loading = true;
		error = '';

		amatsukazeAxios
			.put(`/api/tier-lists`, {
				id: create ? '' : tierData.id,
				title: tierData.title,
				description: tierData.description,
				tiers: tierData.tiers.map((t) => ({
					label: t.label,
					description: t.description,
					color: t.color,
					size: t.size,
					vtubers: t.vtubers.map((v) => ({
						id: v.id,
						name: v.name,
						image: v.image,
						description: v.description
					}))
				})),
				options: tierData.options.map((v) => ({
					id: v.id,
					name: v.name,
					image: v.image,
					description: v.description
				}))
			})
			.then((resp) => {
				const data: tierListResponse = resp.data;
				editMode = false;
				create && goto(`/tier-list/${data.data.id}/${data.data.title}`);
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const toggleEdit = () => {
		editMode = !editMode;
	};

	const onSignIn = () => {
		goto('/auth/sign-in');
	};
</script>

<Head title="{tierData.title} Tier-List" description={tierData.description} />

<div class="grid gap-4">
	<div class="flex items-center justify-between gap-4">
		<span class="text-3xl font-bold">
			{#if !editMode}
				{tierData.title} Tier-List
			{:else}
				<InputText bind:value={tierData.title} placeholder="Title" />
			{/if}
		</span>
		<span class="flex items-center gap-2">
			<span class="text-red-500">{error}</span>
			{#if !editable}
				<Button on:click={onSignIn}><LockIcon class="w-5 h-5" />Sign-in to Save</Button>
			{:else if !editMode}
				<Button on:click={toggleEdit}><EditIcon class="w-5 h-5" /> Edit</Button>
			{:else}
				{#if tierData.id && updateable}
					<Button disabled={loading} on:click={() => onSave(false)}>Update</Button>
				{/if}
				<Button disabled={loading} on:click={() => onSave(true)}>Save as New</Button>
				<Button on:click={toggleEdit}>Cancel</Button>
			{/if}
		</span>
	</div>
	<Border />
	<div class="whitespace-pre">
		{#if !editMode}
			{tierData.description}
		{:else}
			<InputTextArea bind:value={tierData.description} placeholder="Description" class="w-full" rows={5} />
		{/if}
	</div>
	<div class="text-sm opacity-70" title={tierData.updatedAt.toISOString()}>
		{tierData.user.username} • {tierData.updatedAt.toISOString().slice(0, 10)}
	</div>
	<Board bind:data={tierData.tiers} {editMode} />
	<List bind:data={tierData.tiers} agencies={data.agencies.data.map((a) => a.name)} bind:vtubers={tierData.options} {editMode} />
</div>
