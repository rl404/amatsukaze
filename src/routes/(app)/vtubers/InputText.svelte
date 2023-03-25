<script lang="ts">
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let id: string = '';
	export let label: string;
	export let placeholder: string;
	export let value: string;
	export let datalist: Array<string> = [];
</script>

<div>
	<label for={id} class="block mb-2 font-medium">{label}</label>
	<InputText {id} {placeholder} bind:value class="w-full pl-2" {datalist} />
</div>
