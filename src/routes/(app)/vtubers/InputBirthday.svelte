<script lang="ts">
	import { MonthNames } from '$lib/const';
	import { Select } from 'flowbite-svelte';

	export let birthdayDay: string;
	export let startBirthdayMonth: string;
	export let endBirthdayMonth: string;

	const dayOptions = [
		...[
			{
				name: 'any',
				value: ''
			}
		],
		...Array(31)
			.fill(0)
			.map((_, i) => ({ name: (i + 1).toString(), value: (i + 1).toString() }))
	];

	const monthOptions = [
		...[
			{
				name: 'any',
				value: ''
			}
		],
		...Array(12)
			.fill(0)
			.map((_, i) => ({ name: MonthNames[i], value: (i + 1).toString() }))
	];

	let day = birthdayDay.toString();
	let month = startBirthdayMonth.toString();

	$: day, setBDay();
	$: month, setBMonth();
	$: birthdayDay, setDay();
	$: startBirthdayMonth, endBirthdayMonth, setMonth();

	const setDay = () => (day = birthdayDay.toString());
	const setMonth = () => (month = startBirthdayMonth.toString());
	const setBDay = () => (birthdayDay = day);
	const setBMonth = () => ([startBirthdayMonth, endBirthdayMonth] = [month, month]);
</script>

<div class="grid grid-cols-2 gap-2">
	<Select size="sm" placeholder="" items={dayOptions} bind:value={day} />
	<Select size="sm" placeholder="" items={monthOptions} bind:value={month} />
</div>
