<script lang="ts">
	import { channelTypes, toTitleCase } from '$lib/utils';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';

	export let value: Array<string>;

	let channelChecked: Array<boolean | undefined> = channelTypes.map((t) => {
		if (value.includes(t)) return true;
		if (value.includes('-' + t)) return false;
		return undefined;
	});

	$: channelChecked, updateValue();
	$: value, updateChecked();

	const updateValue = () => {
		value = channelChecked
			.map((c, i) => {
				if (c === true) return channelTypes[i];
				if (c === false) return '-' + channelTypes[i];
				return '';
			})
			.filter((v) => v !== '');
	};

	const updateChecked = () => {
		channelChecked = channelTypes.map((t) => {
			if (value.includes(t)) return true;
			if (value.includes('-' + t)) return false;
			return undefined;
		});
	};
</script>

<div>
	<div class="block mb-2 font-medium pointer-events-none">Channels</div>

	<div class="flex gap-2 justify-center">
		{#each channelTypes as ct, i}
			<div class="w-full">
				<InputCheckbox label={toTitleCase(ct)} value={ct} bind:state={channelChecked[i]} useIndeterminate />
			</div>
		{/each}
	</div>
</div>
