<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';

	export let id: string = '';
	export let value: string = '';
	export let checked: boolean | undefined;
	export let state: boolean | undefined = checked;
	export let useIndeterminate: boolean = false;

	let indeterminate: boolean = false;

	$: if (useIndeterminate) {
		switch (state) {
			case undefined:
				checked = false;
				indeterminate = true;
				break;
			case true:
				checked = true;
				indeterminate = false;
				break;
			case false:
				checked = false;
				indeterminate = false;
		}
	}

	const onChange = (e: Event) => {
		if (!useIndeterminate) return;
		e.preventDefault();

		switch (state) {
			case true:
				checked = undefined;
				indeterminate = true;
				break;
			case false:
				checked = true;
				indeterminate = false;
				break;
			default:
				checked = false;
				indeterminate = false;
		}

		state = indeterminate ? undefined : checked;
	};
</script>

<Checkbox {id} {indeterminate} bind:value bind:checked on:change={onChange}>
	<slot />
</Checkbox>
