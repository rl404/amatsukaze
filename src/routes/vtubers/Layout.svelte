<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte';
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import Grid2Icon from '$lib/components/icons/Grid2Icon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';

	export let layoutName: string = 'grid';

	const layouts = [
		{ name: 'grid', component: Grid1Icon },
		{ name: 'card', component: Grid2Icon },
		{ name: 'list', component: ListIcon }
	];

	let layoutIndex: number = 0;

	const nextLayout = () => {
		layoutIndex = (layoutIndex + 1) % layouts.length;
		layoutName = layouts[layoutIndex].name;
	};
</script>

<div>
	{#each layouts as l, i}
		{#if i === layoutIndex}
			<IconButton title={l.name + ' layout'} on:click={nextLayout}>
				<svelte:component this={l.component} class="w-5 h-5" />
			</IconButton>
		{/if}
	{/each}
</div>
