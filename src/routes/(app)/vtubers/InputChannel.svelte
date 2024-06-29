<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { ChannelTypes } from '$lib/const';
	import { toTitleCase } from '$lib/utils/utils';

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
			value={ct}
			useIndeterminate
			checked={channelChecked[i]}
			bind:state={channelChecked[i]}
		>
			{toTitleCase(ct)}
		</Checkbox>
	{/each}
</div>
