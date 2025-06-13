<script lang="ts">
	import SliderIcon from '$lib/components/icons/SliderIcon.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { DefaultVtubersQuery, Zodiacs } from '$lib/const';
	import type { VtubersQuery } from '$lib/types';
	import { Button, Input, Label, Modal, Select, Tooltip } from 'flowbite-svelte';
	import type { AgencyResponseData } from '../../api/agencies/[id]/+server';
	import type { LanguageResponseData } from '../../api/languages/+server';
	import InputBirthday from './InputBirthday.svelte';
	import InputChannel from './InputChannel.svelte';
	import InputStatus from './InputStatus.svelte';

	export let query: VtubersQuery;
	export let loading: boolean;
	export let agencies: AgencyResponseData[];
	export let languages: LanguageResponseData[];
	export let characterDesigners: string[];
	export let character2dModelers: string[];
	export let character3dModelers: string[];
	export let onSubmit: () => void;

	let open: boolean = false;

	const onReset = () => (query = { ...DefaultVtubersQuery }) && onSubmit();
</script>

<Button
	color="alternative"
	class="hover:text-primary p-2.5 text-gray-500"
	onclick={() => (open = true)}
>
	<SliderIcon class="size-5" />
</Button>
<Tooltip>advanced search</Tooltip>

<Modal title="Vtuber Search" bind:open outsideclose autoclose>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		<div class="grid gap-2">
			<Label for="name">Name</Label>
			<Input id="name" placeholder="any" bind:value={query.name} />
		</div>
		<div class="grid gap-2">
			<Label for="original_name">Original Name</Label>
			<Input id="original_name" placeholder="any" bind:value={query.original_name} />
		</div>
		<div class="grid gap-2">
			<Label for="nickname">Nickname</Label>
			<Input id="nickname" placeholder="any" bind:value={query.nickname} />
		</div>
		<div class="grid gap-2">
			<Label>Status</Label>
			<InputStatus
				bind:excludeActive={query.exclude_active}
				bind:excludeRetired={query.exclude_retired}
			/>
		</div>
		<div class="grid gap-2">
			<Label>Debut Year</Label>
			<div class="flex items-center gap-2">
				<Input placeholder="any" bind:value={query.start_debut_year} />
				<span>to</span>
				<Input placeholder="any" bind:value={query.end_debut_year} />
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Retired Year</Label>
			<div class="flex items-center gap-2">
				<Input placeholder="any" bind:value={query.start_retired_year} />
				<span>to</span>
				<Input placeholder="any" bind:value={query.end_retired_year} />
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="in_agency">Agency</Label>
			<Checkbox
				id="in_agency"
				checked={query.in_agency}
				useIndeterminate
				bind:state={query.in_agency}
			>
				<Label for="in_agency">In Agency</Label>
			</Checkbox>
		</div>
		<div class="grid gap-2">
			<Label for="agency">Agency</Label>
			<Select
				id="agency"
				placeholder=""
				items={[
					{ name: 'any', value: '' },
					...agencies.map((a) => ({ name: a.name, value: a.id.toString() }))
				]}
				bind:value={query.agency_id}
			/>
		</div>
		<div class="grid grid-cols-2 gap-2">
			<Label class="col-span-2">Model</Label>
			<Checkbox id="has_2d" checked={query.has_2d} useIndeterminate bind:state={query.has_2d}>
				<Label for="has_2d">2D Model</Label>
			</Checkbox>
			<Checkbox id="has_3d" checked={query.has_3d} useIndeterminate bind:state={query.has_3d}>
				<Label for="has_3d">3D Model</Label>
			</Checkbox>
		</div>
		<div class="grid gap-2">
			<Label for="character_designer">Character Designer</Label>
			<Select
				id="character_designer"
				placeholder=""
				items={[
					{ name: 'any', value: '' },
					...characterDesigners.map((a) => ({ name: a, value: a }))
				]}
				bind:value={query.character_designer}
			/>
		</div>
		<div class="grid gap-2">
			<Label for="character_2d_modeler">Character 2D Modeler</Label>
			<Select
				id="character_2d_modeler"
				placeholder=""
				items={[
					{ name: 'any', value: '' },
					...character2dModelers.map((a) => ({ name: a, value: a }))
				]}
				bind:value={query.character_2d_modeler}
			/>
		</div>
		<div class="grid gap-2">
			<Label for="character_3d_modeler">Character 3D Modeler</Label>
			<Select
				id="character_3d_modeler"
				placeholder=""
				items={[
					{ name: 'any', value: '' },
					...character3dModelers.map((a) => ({ name: a, value: a }))
				]}
				bind:value={query.character_3d_modeler}
			/>
		</div>
		<div class="col-span-1 grid gap-2 sm:col-span-2">
			<Label>Channel</Label>
			<InputChannel bind:value={query.channel_types} />
		</div>
		<div class="grid gap-2">
			<Label>Subscriber</Label>
			<div class="flex items-center gap-2">
				<Input placeholder="any" bind:value={query.start_subscriber} />
				<span>to</span>
				<Input placeholder="any" bind:value={query.end_subscriber} />
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Video Count</Label>
			<div class="flex items-center gap-2">
				<Input placeholder="any" bind:value={query.start_video_count} />
				<span>to</span>
				<Input placeholder="any" bind:value={query.end_video_count} />
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Birthday</Label>
			<InputBirthday
				bind:birthdayDay={query.birthday_day}
				bind:startBirthdayMonth={query.start_birthday_month}
				bind:endBirthdayMonth={query.end_birthday_month}
			/>
		</div>
		<div class="grid gap-2">
			<Label for="language">Language</Label>
			<Select
				id="language"
				placeholder=""
				items={[
					{ name: 'any', value: '' },
					...languages.map((a) => ({ name: a.name, value: a.id.toString() }))
				]}
				bind:value={query.language_id}
			/>
		</div>
		<div class="grid gap-2">
			<Label for="gender">Gender</Label>
			<Input id="gender" placeholder="any" list="gender-datalist" bind:value={query.genders} />
			<datalist id="gender-datalist">
				<option>Male</option>
				<option>Female</option>
			</datalist>
		</div>
		<div class="grid gap-2">
			<Label for="blood_type">Blood Type</Label>
			<Input
				id="blood_type"
				placeholder="any"
				list="blood_type-datalist"
				bind:value={query.blood_types}
			/>
			<datalist id="blood_type-datalist">
				<option>A</option>
				<option>B</option>
				<option>AB</option>
				<option>O</option>
			</datalist>
		</div>
		<div class="grid gap-2">
			<Label for="zodiac">Zodiac</Label>
			<Input id="zodiac" placeholder="any" list="zodiac-datalist" bind:value={query.zodiacs} />
			<datalist id="zodiac-datalist">
				{#each Zodiacs.sort() as zodiac}
					<option>{zodiac}</option>
				{/each}
			</datalist>
		</div>
	</div>
	{#snippet footer()}
		<div class="flex w-full items-center justify-end gap-2">
			<Button color="light" onclick={onReset} disabled={loading}>Reset</Button>
			<Button onclick={onSubmit} disabled={loading}>Search</Button>
		</div>
	{/snippet}
</Modal>
