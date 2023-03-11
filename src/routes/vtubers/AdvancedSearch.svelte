<script lang="ts">
	import { createEventDispatcher, type SvelteComponent } from 'svelte';
	import { resetObject } from '$lib/utils';
	import IconButton from '$lib/components/IconButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import InputText from './InputText.svelte';
	import InputStatus from './InputStatus.svelte';
	import InputDebutYear from './InputDebutYear.svelte';
	import InputRetiredYear from './InputRetiredYear.svelte';
	import InputModel from './InputModel.svelte';
	import InputDesigner from './InputDesigner.svelte';
	import Input2DModeler from './Input2DModeler.svelte';
	import Input3DModeler from './Input3DModeler.svelte';
	import InputInAgency from './InputInAgency.svelte';
	import InputAgency from './InputAgency.svelte';
	import InputChannel from './InputChannel.svelte';

	type advancedQuery = {
		name: string;
		original_name: string;
		nickname: string;
		include_active: boolean;
		include_retired: boolean;
		exclude_active: boolean;
		exclude_retired: boolean;
		debut_year: Array<number>;
		start_debut_year: number;
		end_debut_year: number;
		retired_year: Array<number>;
		start_retired_year: number;
		end_retired_year: number;
		has_2d?: boolean;
		has_3d?: boolean;
		character_designer: string;
		character_2d_modeler: string;
		character_3d_modeler: string;
		in_agency?: boolean;
		agency: string;
		channel_types: Array<string>;
	};

	const dispatch = createEventDispatcher<{ submit: advancedQuery }>();

	let modal: SvelteComponent;
	let query: advancedQuery = {
		name: '',
		original_name: '',
		nickname: '',
		include_active: true,
		include_retired: true,
		exclude_active: false,
		exclude_retired: false,
		debut_year: [0, 0],
		start_debut_year: 0,
		end_debut_year: 0,
		retired_year: [0, 0],
		start_retired_year: 0,
		end_retired_year: 0,
		character_designer: '',
		character_2d_modeler: '',
		character_3d_modeler: '',
		agency: '',
		channel_types: []
	};
	let minDebutYear: number = 0;
	let maxDebutYear: number = 0;
	let minRetiredYear: number = 0;
	let maxRetiredYear: number = 0;

	const toggleOpen = () => {
		modal.toggleOpen();
	};

	const onReset = () => {
		query = resetObject(query);
		query.include_active = true;
		query.include_retired = true;
		query.debut_year = [minDebutYear, maxDebutYear];
		query.retired_year = [minRetiredYear, maxRetiredYear];
		query.has_2d = undefined;
		query.has_3d = undefined;
		query.in_agency = undefined;
	};

	const onSubmit = () => {
		query.exclude_active = !query.include_active;
		query.exclude_retired = !query.include_retired;
		query.start_debut_year = query.debut_year[0] === minDebutYear ? 0 : query.debut_year[0];
		query.end_debut_year = query.debut_year[1] === maxDebutYear ? 0 : query.debut_year[1];
		query.start_retired_year = query.retired_year[0] === minRetiredYear ? 0 : query.retired_year[0];
		query.end_retired_year = query.retired_year[1] === maxRetiredYear ? 0 : query.retired_year[1];

		modal.toggleOpen();
		dispatch('submit', query);
	};
</script>

<div>
	<IconButton title="advanced search" on:click={toggleOpen}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			<path
				d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
			/>
		</svg>
	</IconButton>

	<Modal bind:this={modal} maxWidthClass="max-w-3xl">
		<span slot="title">Advanced Search</span>

		<div slot="body" class="p-4 grid grid-cols-3 gap-4">
			<div>
				<InputText id="name" label="Name" placeholder="name" bind:value={query.name} />
			</div>
			<div>
				<InputText id="originalName" label="Original Name" placeholder="original name" bind:value={query.original_name} />
			</div>
			<div>
				<InputText id="nickname" label="Nickname" placeholder="nickname" bind:value={query.nickname} />
			</div>
			<div>
				<InputStatus bind:includeActive={query.include_active} bind:includeRetired={query.include_retired} />
			</div>
			<div>
				<InputDebutYear bind:values={query.debut_year} bind:minValue={minDebutYear} bind:maxValue={maxDebutYear} />
			</div>
			<div>
				<InputRetiredYear bind:values={query.retired_year} bind:minValue={minRetiredYear} bind:maxValue={maxRetiredYear} />
			</div>
			<div>
				<InputInAgency bind:inAgency={query.in_agency} />
			</div>
			<div>
				<InputAgency bind:value={query.agency} />
			</div>
			<div>
				<InputModel bind:has2D={query.has_2d} bind:has3D={query.has_3d} />
			</div>
			<div>
				<InputDesigner bind:value={query.character_designer} />
			</div>
			<div>
				<Input2DModeler bind:value={query.character_2d_modeler} />
			</div>
			<div>
				<Input3DModeler bind:value={query.character_3d_modeler} />
			</div>
			<div class="col-span-3">
				<InputChannel bind:value={query.channel_types} />
			</div>
		</div>

		<div slot="footer" class="sticky bottom-0 bg-white dark:bg-neutral-700 py-2 px-4 border-t dark:border-neutral-600 flex justify-between gap-2">
			<Button on:click={onReset}>Reset</Button>
			<Button on:click={onSubmit} color>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
				Search</Button
			>
		</div>
	</Modal>
</div>
