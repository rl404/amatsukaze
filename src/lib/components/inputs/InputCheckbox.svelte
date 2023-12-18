<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let value: string = '';
	export let checked: boolean | undefined;
	export let useIndeterminate: boolean = false;
	export { className as class };

	let element: HTMLInputElement;
	let className: string = '';
	let state: boolean | undefined = checked;

	// TODO: fix reactive checked.

	onMount(() => {
		if (!element || !useIndeterminate) return;
		if (state !== undefined) return;
		checked = undefined;
		element.indeterminate = true;
	});

	const onChange = (e: Event) => {
		if (!element || !useIndeterminate) return;
		e.preventDefault();

		switch (state) {
			case true:
				checked = undefined;
				element.indeterminate = true;
				break;
			case false:
				checked = true;
				element.indeterminate = false;
				break;
			default:
				checked = false;
				element.indeterminate = false;
		}

		state = element.indeterminate ? undefined : checked;
	};
</script>

<div class="{className} flex items-center gap-2">
	<input
		id={label}
		type="checkbox"
		bind:value
		bind:checked
		bind:this={element}
		on:change={onChange}
	/>
	<label for={label} class="font-medium">{label}</label>
</div>
