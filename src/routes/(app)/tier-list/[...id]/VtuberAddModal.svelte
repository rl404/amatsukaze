<script lang="ts">
	import InputText from '$lib/components/inputs/InputText.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import type { TierVtuber } from './+page.server';
	import VtuberGrid from './VtuberGrid.svelte';

	export let addedVtubers: Array<TierVtuber>;
	export let agencies: Array<string>;
	export let onAddVtuber: (vtuber: TierVtuber) => void;

	let modal: SvelteComponent;
	let valueVtuber: string = '';
	let valueAgency: string = '';
	let vtubers: Array<vtuberResponseData> = [];
	let loading: boolean = false;
	let error: string = '';

	export const toggleOpen = () => {
		modal.toggleOpen();
	};

	const onSubmit = async () => {
		if (valueVtuber === '' && valueAgency === '') return;
		if (valueVtuber !== '' && valueVtuber.length < 3) return;
		if (valueAgency !== '' && valueAgency.length < 3) return;

		loading = true;
		error = '';

		await axios
			.get(`/api/vtubers?names=${valueVtuber}&agency=${valueAgency}&sort=name&limit=-1`)
			.then((resp) => (vtubers = resp.data.data.filter((d: vtuberResponseData) => !addedVtubers.find((v) => v.id === d.id))))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const onClick = (vtuber: vtuberResponseData) => {
		vtubers = vtubers.filter((v) => v.id !== vtuber.id);
		onAddVtuber({
			id: vtuber.id,
			name: vtuber.name,
			image: vtuber.image,
			description: '',
			isDndShadowItem: false
		});
	};
</script>

<Modal bind:this={modal} maxWidthClass="max-w-3xl">
	<div slot="title">Add New Vtuber</div>

	<div slot="body" class="p-4 grid gap-8">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="vtuber" class="block mb-2 font-medium">Vtuber Name</label>
				<InputText id="vtuber" class="w-full" bind:value={valueVtuber} placeholder="Gawr Gura" on:enter={onSubmit} />
			</div>
			<div>
				<label for="agency" class="block mb-2 font-medium">Agency Name</label>
				<InputText id="agency" class="w-full" bind:value={valueAgency} placeholder="Hololive" on:enter={onSubmit} datalist={agencies} />
			</div>
		</div>
		<div class="grid grid-cols-6 gap-4">
			{#if loading}
				<div class="col-span-6">
					<SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
				</div>
			{/if}
			{#if error !== ''}
				<div class="col-span-6 text-center text-red-500">
					{error}
				</div>
			{/if}
			{#each vtubers as vtuber}
				<VtuberGrid
					id={vtuber.id}
					name={vtuber.name}
					image={vtuber.image}
					description=""
					class="col-span-3 sm:col-span-2 md:col-span-1"
					on:click={() => onClick(vtuber)}
				/>
			{/each}
		</div>
	</div>
</Modal>
