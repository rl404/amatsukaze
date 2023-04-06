<script lang="ts">
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let value: string;
	export let options: Array<string>;
</script>

<div>
	<label for="agency" class="block mb-2 font-medium">Agency</label>
	<InputText id="agency" placeholder="any" class="w-full pl-2" bind:value datalist={options} />
</div>
