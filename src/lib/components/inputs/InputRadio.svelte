<script lang="ts">
	export let label: string;
	export let value: string;
	export let group: string;
</script>

<div class="flex items-center gap-2">
	<input id={label} type="radio" {value} bind:group on:change />
	<label for={label} class="font-medium">{label}</label>
</div>
