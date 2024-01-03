<script lang="ts">
	export let id: string = '';
	export let value: string;
	export let placeholder: string = '';
	export let rows: number = 3;
	export { className as class };
	let className: string = '';
</script>

<textarea {id} {rows} {placeholder} bind:value class={className} />
