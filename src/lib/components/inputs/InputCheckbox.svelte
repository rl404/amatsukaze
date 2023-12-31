<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let checked: boolean | undefined;
	export let state: boolean | undefined = checked;
	export let useIndeterminate: boolean = false;
	export { className as class };

	let element: HTMLInputElement;
	let className: string = '';

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
