<script lang="ts">
	import InputDropdown from '$lib/components/inputs/InputDropdown.svelte';
	import { monthNames } from '$lib/utils';

	export let birthdayDay: number;
	export let birthdayMonth: number;

	$: dayStr = birthdayDay.toString();
	$: monthStr = birthdayMonth.toString();

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
			.map((_, i) => ({ label: monthNames[i], value: (i + 1).toString() }))
	];

	const onDayChange = () => {
		birthdayDay = parseInt(dayStr);
	};

	const onMonthChange = () => {
		birthdayMonth = parseInt(monthStr);
	};
</script>

<div>
	<div class="mb-2 font-medium pointer-events-none">Birthday</div>

	<div class="flex gap-2 justify-center">
		<div class="w-full">
			<InputDropdown bind:value={dayStr} options={dayOptions} on:change={onDayChange} />
		</div>
		<div class="w-full">
			<InputDropdown bind:value={monthStr} options={monthOptions} on:change={onMonthChange} />
		</div>
	</div>
</div>
