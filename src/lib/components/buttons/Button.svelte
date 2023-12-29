<script lang="ts">
	export let title: string = '';
	export let color: boolean = false;
	export let disabled: boolean = false;
	export { className as class };
	let className: string = '';
</script>

<button
	class="{className} {color
		? 'bg-primary text-white dark:bg-primary-dark'
		: 'bg-border dark:bg-border-dark'} clickable rounded-lg text-center"
	on:click
	{title}
	{disabled}
>
	<slot />
</button>
