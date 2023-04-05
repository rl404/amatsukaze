<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import Grid2Icon from '$lib/components/icons/Grid2Icon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import TimelineIcon from '$lib/components/icons/TimelineIcon.svelte';

	export let value: string;
	export let sort: string;

	const layouts = [
		{ name: 'timeline', component: TimelineIcon },
		{ name: 'grid', component: Grid1Icon },
		{ name: 'card', component: Grid2Icon },
		{ name: 'list', component: ListIcon }
	];

	let layoutIndex: number = layouts.findIndex((l) => l.name === value);

	const nextLayout = () => {
		layoutIndex = (layoutIndex + 1) % layouts.length;
		value = layouts[layoutIndex].name;
		if (value === 'timeline') sort = 'debut_date';
	};
</script>

<div>
	{#each layouts as l, i}
		{#if i === layoutIndex}
			<IconButton title={l.name + ' layout'} on:click={nextLayout}>
				<svelte:component this={l.component} class="w-4 h-4" />
			</IconButton>
		{/if}
	{/each}
</div>
