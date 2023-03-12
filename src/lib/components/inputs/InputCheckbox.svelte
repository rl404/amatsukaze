<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let checked: boolean = false;
	export let useIndeterminate: boolean = false;
	export let state: boolean | undefined = undefined;

	let element: HTMLInputElement;

	$: if (element && useIndeterminate) {
		switch (state) {
			case undefined:
				checked = false;
				element.indeterminate = true;
				break;
			case true:
				checked = true;
				element.indeterminate = false;
				break;
			case false:
				checked = false;
				element.indeterminate = false;
		}
	}

	const onClick = () => {
		if (!element || !useIndeterminate) return;

		switch (state) {
			case undefined:
				checked = true;
				element.indeterminate = false;
				break;
			case true:
				checked = false;
				element.indeterminate = false;
				break;
			case false:
				checked = false;
				element.indeterminate = true;
		}

		state = element.indeterminate ? undefined : checked;
	};
</script>

<div class="flex items-center gap-2" on:click={onClick}>
	<input id={label} type="checkbox" bind:this={element} bind:value bind:checked />
	<label for={label} class="font-medium">{label}</label>
</div>
