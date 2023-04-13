<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount, type SvelteComponent } from 'svelte';
	import { isArrayTypeOf, resetObject, zodiacs } from '$lib/utils';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ConfigIcon from '$lib/components/icons/ConfigIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
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
	import InputBirthday from './InputBirthday.svelte';
	import InputSubscriber from './InputSubscriber.svelte';

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
		has_2d?: boolean | string;
		has_3d?: boolean | string;
		character_designer: string;
		character_2d_modeler: string;
		character_3d_modeler: string;
		in_agency?: boolean | string;
		agency: string;
		channel_types: Array<string>;
		birthday_day: number;
		birthday_month: number;
		start_birthday_month: number;
		end_birthday_month: number;
		blood_types: string;
		genders: string;
		zodiacs: string;
		subscriber: Array<number>;
		start_subscriber: number;
		end_subscriber: number;
	};

	const dispatch = createEventDispatcher<{ submit: advancedQuery }>();

	export let agencies: Array<string>;
	export let characterDesigners: Array<string>;
	export let character2dModelers: Array<string>;
	export let character3dModelers: Array<string>;
	export let startDebutYear: number;
	export let endDebutYear: number = new Date().getFullYear();
	export let startRetiredYear: number;
	export let endRetiredYear: number = new Date().getFullYear();

	let modal: SvelteComponent;
	let query: advancedQuery = {
		name: '',
		original_name: '',
		nickname: '',
		include_active: true,
		include_retired: true,
		exclude_active: false,
		exclude_retired: false,
		debut_year: [startDebutYear, endDebutYear],
		start_debut_year: startDebutYear,
		end_debut_year: endDebutYear,
		retired_year: [startRetiredYear, endRetiredYear],
		start_retired_year: startRetiredYear,
		end_retired_year: endRetiredYear,
		character_designer: '',
		character_2d_modeler: '',
		character_3d_modeler: '',
		agency: '',
		channel_types: [],
		birthday_day: 0,
		birthday_month: 0,
		start_birthday_month: 0,
		end_birthday_month: 0,
		blood_types: '',
		genders: '',
		zodiacs: '',
		subscriber: [0, 5e6],
		start_subscriber: 0,
		end_subscriber: 0
	};

	type advancedQueryKey = keyof typeof query;

	onMount(() => {
		const params = Array.from($page.url.searchParams.entries()) as Array<[advancedQueryKey, any]>;
		if (params.length === 0) return;

		query = {
			...query,
			...params.reduce((res: any, curr) => {
				if (typeof query[curr[0]] === 'number') {
					res[curr[0]] = parseInt(curr[1]);
				} else if (typeof query[curr[0]] === 'boolean') {
					res[curr[0]] = curr[1] === 'true';
				} else if (query[curr[0]] instanceof Array) {
					if (isArrayTypeOf(query[curr[0]], 'number')) {
						res[curr[0]] = curr[1].split(',').map((v: string) => parseInt(v));
					}
					if (isArrayTypeOf(query[curr[0]], 'string')) {
						res[curr[0]] = curr[1].split(',');
					}
				} else {
					res[curr[0]] = curr[1];
				}
				return res;
			}, {})
		};

		query.include_active = !query.exclude_active;
		query.include_retired = !query.exclude_retired;
		query.has_2d = !query.has_2d || query.has_2d === '' ? undefined : query.has_2d === 'true';
		query.has_3d = !query.has_3d || query.has_3d === '' ? undefined : query.has_3d === 'true';
		query.in_agency = !query.in_agency || query.in_agency === '' ? undefined : query.in_agency === 'true';
		query.birthday_month = query.start_birthday_month;
	});

	const toggleOpen = () => {
		modal.toggleOpen();
	};

	const onReset = () => {
		query = resetObject(query);
		query.include_active = true;
		query.include_retired = true;
		query.debut_year = [startDebutYear, endDebutYear];
		query.retired_year = [startRetiredYear, endRetiredYear];
		query.has_2d = undefined;
		query.has_3d = undefined;
		query.in_agency = undefined;
		query.subscriber = [0, 5e6];
	};

	const onSubmit = () => {
		query.exclude_active = !query.include_active;
		query.exclude_retired = !query.include_retired;
		query.start_debut_year = query.debut_year[0] === startDebutYear ? 0 : query.debut_year[0];
		query.end_debut_year = query.debut_year[1] === endDebutYear ? 0 : query.debut_year[1];
		query.start_retired_year = query.retired_year[0] === startRetiredYear ? 0 : query.retired_year[0];
		query.end_retired_year = query.retired_year[1] === endRetiredYear ? 0 : query.retired_year[1];
		query.start_birthday_month = query.birthday_month;
		query.end_birthday_month = query.birthday_month;
		query.start_subscriber = query.subscriber[0] === 0 ? 0 : query.subscriber[0];
		query.end_subscriber = query.subscriber[1] === 5e6 ? 0 : query.subscriber[1];

		modal.toggleOpen();
		dispatch('submit', query);
	};
</script>

<div>
	<IconButton title="advanced search" on:click={toggleOpen}>
		<ConfigIcon class="w-5 h-5" />
	</IconButton>

	<Modal bind:this={modal} maxWidthClass="max-w-3xl">
		<span slot="title">Advanced Search</span>

		<div slot="body" class="p-4 grid grid-cols-6 gap-4">
			<div class="col-span-6 sm:col-span-2">
				<InputText id="name" label="Name" placeholder="any" bind:value={query.name} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputText id="originalName" label="Original Name" placeholder="any" bind:value={query.original_name} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputText id="nickname" label="Nickname" placeholder="any" bind:value={query.nickname} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputStatus bind:includeActive={query.include_active} bind:includeRetired={query.include_retired} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputDebutYear bind:values={query.debut_year} bind:minValue={startDebutYear} bind:maxValue={endDebutYear} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputRetiredYear bind:values={query.retired_year} bind:minValue={startRetiredYear} bind:maxValue={endRetiredYear} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputInAgency bind:inAgency={query.in_agency} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputAgency bind:value={query.agency} options={agencies} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputModel bind:has2D={query.has_2d} bind:has3D={query.has_3d} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputDesigner bind:value={query.character_designer} options={characterDesigners} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<Input2DModeler bind:value={query.character_2d_modeler} options={character2dModelers} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<Input3DModeler bind:value={query.character_3d_modeler} options={character3dModelers} />
			</div>
			<div class="col-span-6 sm:col-span-4">
				<InputChannel bind:value={query.channel_types} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputSubscriber bind:values={query.subscriber} minValue={0} maxValue={5e6} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputBirthday bind:birthdayDay={query.birthday_day} bind:birthdayMonth={query.birthday_month} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputText id="gender" label="Gender" placeholder="any" bind:value={query.genders} datalist={['Male', 'Female']} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputText id="bloodType" label="Blood Type" placeholder="any" bind:value={query.blood_types} datalist={['A', 'B', 'AB', 'O']} />
			</div>
			<div class="col-span-6 sm:col-span-2">
				<InputText id="zodiac" label="Zodiac" placeholder="any" bind:value={query.zodiacs} datalist={zodiacs.sort()} />
			</div>
		</div>

		<div slot="footer" class="sticky bottom-0 bg-white dark:bg-neutral-700 py-2 px-4 border-t dark:border-neutral-600 flex justify-between gap-2">
			<Button on:click={onReset}>Reset</Button>
			<Button on:click={onSubmit} color>
				<SearchIcon class="w-4 h-4" /> Search
			</Button>
		</div>
	</Modal>
</div>
