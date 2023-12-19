<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let value: string;
	export let placeholder: string;
	export { className as class };
	let className: string = '';
</script>

<div class="relative w-full">
	<InputText class="{className} pl-9" bind:value {placeholder} on:enter on:reset />
	<div class="pointer-events-none absolute inset-y-0 left-2 flex items-center">
		<SearchIcon class="h-4 w-4" />
	</div>
</div>
