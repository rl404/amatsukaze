<script lang="ts">
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';

	export let includeActive: boolean;
	export let includeRetired: boolean;
</script>

<div>
	<div class="block mb-2 font-medium pointer-events-none">Status</div>

	<div class="flex gap-2 justify-center">
		<div class="w-full">
			<InputCheckbox label="Active" bind:checked={includeActive} />
		</div>
		<div class="w-full">
			<InputCheckbox label="Retired" bind:checked={includeRetired} />
		</div>
	</div>
</div>
