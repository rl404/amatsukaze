<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import ConfigIcon from '$lib/components/icons/ConfigIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { defaultVtubersQuery, type VtubersQuery } from '$lib/types';
	import { Zodiacs } from '$lib/utils/const';
	import { createEventDispatcher, SvelteComponent } from 'svelte';
	import InputBirthday from './InputBirthday.svelte';
	import InputChannel from './InputChannel.svelte';
	import InputDebutYear from './InputDebutYear.svelte';
	import InputInAgency from './InputInAgency.svelte';
	import InputModel from './InputModel.svelte';
	import InputRetiredYear from './InputRetiredYear.svelte';
	import InputStatus from './InputStatus.svelte';
	import InputSubscriber from './InputSubscriber.svelte';
	import InputText from './InputText.svelte';
	import InputVideoCount from './InputVideoCount.svelte';

	const dispatch = createEventDispatcher<{ submit: null }>();

	export let query: VtubersQuery;
	export let agencies: string[];
	export let characterDesigners: string[];
	export let character2dModelers: string[];
	export let character3dModelers: string[];
	export let startDebutYear: number;
	export let endDebutYear: number;
	export let startRetiredYear: number;
	export let endRetiredYear: number;

	let modal: SvelteComponent;

	const toggleOpen = () => modal.toggleOpen();

	const onReset = () => (query = { ...defaultVtubersQuery });

	const onSubmit = () => {
		dispatch('submit');
		toggleOpen();
	};
</script>

<IconButton title="advanced search" class="p-1.5" on:click={toggleOpen}>
	<ConfigIcon class="h-5 w-5" />
</IconButton>

<Modal bind:this={modal} class="max-w-3xl">
	<div slot="header" class="text-xl font-bold">Advanced Search</div>

	<div slot="body" class="grid grid-cols-6 gap-4 p-4">
		<div class="col-span-6 sm:col-span-2">
			<InputText id="name" label="Name" bind:value={query.name} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText id="originalName" label="Original Name" bind:value={query.original_name} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText id="nickname" label="Nickname" bind:value={query.nickname} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputStatus
				bind:excludeActive={query.exclude_active}
				bind:excludeRetired={query.exclude_retired}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputDebutYear
				bind:startDebutYear={query.start_debut_year}
				bind:endDebutYear={query.end_debut_year}
				minValue={startDebutYear}
				maxValue={endDebutYear}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputRetiredYear
				bind:startRetiredYear={query.start_retired_year}
				bind:endRetiredYear={query.end_retired_year}
				minValue={startRetiredYear}
				maxValue={endRetiredYear}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputInAgency bind:inAgency={query.in_agency} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText id="agency" label="Agency" bind:value={query.agency} datalist={agencies} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputModel bind:has2D={query.has_2d} bind:has3D={query.has_3d} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText
				id="designer"
				label="Character Designer"
				bind:value={query.character_designer}
				datalist={characterDesigners}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText
				id="2dModeler"
				label="Character 2D Modeler"
				bind:value={query.character_2d_modeler}
				datalist={character2dModelers}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText
				id="3dModeler"
				label="Character 3D Modeler"
				bind:value={query.character_3d_modeler}
				datalist={character3dModelers}
			/>
		</div>
		<div class="col-span-6 sm:col-span-4">
			<InputChannel bind:value={query.channel_types} />
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputSubscriber
				bind:startSubscriber={query.start_subscriber}
				bind:endSubscriber={query.end_subscriber}
				minValue={0}
				maxValue={5e6}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputVideoCount
				bind:startVideoCount={query.start_video_count}
				bind:endVideoCount={query.end_video_count}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputBirthday
				bind:birthdayDay={query.birthday_day}
				bind:startBirthdayMonth={query.start_birthday_month}
				bind:endBirthdayMonth={query.end_birthday_month}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText
				id="gender"
				label="Gender"
				bind:value={query.genders}
				datalist={['Male', 'Female']}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText
				id="bloodType"
				label="Blood Type"
				bind:value={query.blood_types}
				datalist={['A', 'B', 'AB', 'O']}
			/>
		</div>
		<div class="col-span-6 sm:col-span-2">
			<InputText id="zodiac" label="Zodiac" bind:value={query.zodiacs} datalist={Zodiacs.sort()} />
		</div>
	</div>

	<div slot="footer" class="flex items-center justify-between gap-2 px-4 py-2">
		<Button on:click={onReset} class="p-2 px-4 font-medium">Reset</Button>
		<Button on:click={onSubmit} color class="flex items-center gap-2 p-2 px-4 font-medium">
			<SearchIcon class="h-4 w-4" />
			<span>Search</span>
		</Button>
	</div>
</Modal>
