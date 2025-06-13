<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { ChannelTypes } from '$lib/const';
	import { toTitleCase } from '$lib/utils/utils';
	import { Label } from 'flowbite-svelte';

	export let value: string;

	$: value = channelChecked
		.map((v, i) => {
			if (v === true) return ChannelTypes[i];
			if (v === false) return '-' + ChannelTypes[i];
			return '';
		})
		.filter((v) => v !== '')
		.join(',');
	$: value, setChannelChecked();

	let channelChecked = ChannelTypes.map((ct) => {
		const valueSplit = value.split(',');
		if (valueSplit.includes(ct)) return true;
		if (valueSplit.includes('-' + ct)) return false;
		return undefined;
	});

	const setChannelChecked = () =>
		(channelChecked = ChannelTypes.map((ct) => {
			const valueSplit = value.split(',');
			if (valueSplit.includes(ct)) return true;
			if (valueSplit.includes('-' + ct)) return false;
			return undefined;
		}));
</script>

<div class="flex justify-center gap-2">
	{#each ChannelTypes as ct, i}
		<Checkbox
			id={ct}
			value={ct}
			useIndeterminate
			checked={channelChecked[i]}
			bind:state={channelChecked[i]}
		>
			<Label for={ct}>
				{toTitleCase(ct)}
			</Label>
		</Checkbox>
	{/each}
</div>
