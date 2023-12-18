<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';
	import { ChannelTypes } from '$lib/utils/const';
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

	let channelChecked = ChannelTypes.map((ct) => {
		const valueSplit = value.split(',');
		if (valueSplit.includes(ct)) return true;
		if (valueSplit.includes('-' + ct)) return false;
		return undefined;
	});
</script>

<div class="grid gap-1">
	<label class="font-bold" for="channel">Channels</label>
	<div class="flex justify-center gap-2">
		{#each ChannelTypes as ct, i}
			<InputCheckbox
				label={toTitleCase(ct)}
				value={ct}
				bind:checked={channelChecked[i]}
				useIndeterminate
				class="w-full"
			/>
		{/each}
	</div>
</div>
