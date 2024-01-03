<script lang="ts">
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let id: string = '';
	export let label: string;
	export let placeholder: string = 'any';
	export let value: string;
	export let datalist: string[] = [];
</script>

<div class="grid gap-1">
	<label for={id} class="font-bold">{label}</label>
	<InputText {id} {placeholder} bind:value {datalist} class="w-full pl-2" />
</div>
