<script lang="ts">
	import InputSelect from '$lib/components/inputs/InputSelect.svelte';
	import { MonthNames } from '$lib/utils/const';

	export let birthdayDay: number;
	export let startBirthdayMonth: number;
	export let endBirthdayMonth: number;

	const dayOptions = [
		...[
			{
				label: 'any',
				value: '0'
			}
		],
		...Array(31)
			.fill(0)
			.map((_, i) => ({ label: (i + 1).toString(), value: (i + 1).toString() }))
	];

	const monthOptions = [
		...[
			{
				label: 'any',
				value: '0'
			}
		],
		...Array(12)
			.fill(0)
			.map((_, i) => ({ label: MonthNames[i], value: (i + 1).toString() }))
	];

	let day = birthdayDay.toString();
	let month = startBirthdayMonth.toString();

	$: day, setBDay();
	$: month, setBMonth();
	$: birthdayDay, setDay();
	$: startBirthdayMonth, endBirthdayMonth, setMonth();

	const setDay = () => (day = birthdayDay.toString());
	const setMonth = () => (month = startBirthdayMonth.toString());
	const setBDay = () => (birthdayDay = parseInt(day));
	const setBMonth = () =>
		([startBirthdayMonth, endBirthdayMonth] = [parseInt(month), parseInt(month)]);
</script>

<div class="grid gap-1">
	<label class="font-bold" for="birthday">Birthday</label>
	<div id="birthday" class="grid grid-cols-2 gap-2">
		<InputSelect bind:value={day} options={dayOptions} class="w-full pl-2" />
		<InputSelect bind:value={month} options={monthOptions} class="w-full pl-2" />
	</div>
</div>
