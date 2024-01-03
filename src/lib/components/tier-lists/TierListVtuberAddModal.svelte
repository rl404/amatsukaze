<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { TierVtuber } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount, type SvelteComponent } from 'svelte';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { TierListResponseDataVtuber } from '../../../routes/(app)/tier-lists/[id]/[...title]/+page.server';
	import type { AgencyResponseData } from '../../../routes/api/agencies/[id]/+server';
	import type { VtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';
	import TierListGrid from './TierListGrid.svelte';

	export let data: TierVtuber[];
	export let addedVtubers: TierListResponseDataVtuber[];
	export const toggleOpen = () => modal.toggleOpen();

	let modal: SvelteComponent;
	let valueVtuber: string = '';
	let valueAgency: string = '';
	let vtubers: TierVtuber[] = [];
	let agencies: string[] = [];
	let loading: boolean = false;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/agencies?limit=-1`)
			.then((resp) => (agencies = resp.data.data.map((d: AgencyResponseData) => d.name)))
			.catch((err) => console.log(getAxiosError(err)));
	});

	const onSearch = () => {
		if (valueVtuber === '' && valueAgency === '') return;
		if (valueVtuber !== '' && valueVtuber.length < 3) return;
		if (valueAgency !== '' && valueAgency.length < 3) return;

		loading = true;
		error = '';

		axios
			.get(`/api/vtubers?names=${valueVtuber}&agency=${valueAgency}&sort=name&limit=-1`)
			.then(
				(resp) =>
					(vtubers = resp.data.data.filter(
						(d: VtuberResponseData) => !addedVtubers.find((v) => v.id === d.id)
					))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const onAdd = (vtuber: TierVtuber) => {
		vtubers = vtubers.filter((v) => v.id !== vtuber.id);
		data = [
			...data,
			{
				id: vtuber.id,
				name: vtuber.name,
				image: vtuber.image,
				description: vtuber.description,
				isDndShadowItem: false
			}
		];
	};

	const onAddAll = () => vtubers.forEach((v) => onAdd(v));
</script>

<Modal bind:this={modal} class="max-w-3xl">
	<div slot="header" class="text-xl font-bold">Add New Vtuber</div>

	<div slot="body" class="grid gap-8 p-4">
		<div class="grid grid-cols-2 gap-4">
			<div class="grid gap-2">
				<label for="vtuber" class="font-bold">Vtuber Name</label>
				<InputText
					id="vtuber"
					class="w-full"
					placeholder="Gawr Gura"
					bind:value={valueVtuber}
					on:enter={onSearch}
				/>
			</div>
			<div class="grid gap-2">
				<label for="agency" class="font-bold">Agency Name</label>
				<InputText
					id="agency"
					class="w-full"
					placeholder="Hololive"
					datalist={agencies}
					bind:value={valueAgency}
					on:enter={onSearch}
				/>
			</div>
		</div>
		<div class="grid grid-cols-6 gap-4">
			{#if loading}
				<div class="col-span-6"><Loading class="h-8 w-8" /></div>
			{:else if error !== ''}
				<div class="col-span-6 text-center text-red-500">{error}</div>
			{:else}
				{#each vtubers as vtuber}
					<TierListGrid
						name={vtuber.name}
						image={vtuber.image}
						isShadowItem={vtuber[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
						class="text-sm"
						deletable={false}
						on:click={() => onAdd(vtuber)}
					/>
				{/each}
			{/if}
		</div>
	</div>

	<div slot="footer" class="flex items-center justify-end p-4 {vtubers.length === 0 && 'hidden'}">
		<Button color class="p-2 px-4 font-medium" on:click={onAddAll}>
			Add All {vtubers.length.toLocaleString()} Vtubers
		</Button>
	</div>
</Modal>
