<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Grid1Icon from '$lib/components/icons/Grid1Icon.svelte';
	import TimelineIcon from '$lib/components/icons/TimelineIcon.svelte';

	export let value: string;

	export { className as class };
	let className: string = '';

	const layouts = [
		{ name: 'timeline', component: TimelineIcon },
		{ name: 'heatmap', component: Grid1Icon }
	];

	let layoutIndex: number = layouts.findIndex((l) => l.name === value);

	const nextLayout = () => {
		layoutIndex = (layoutIndex + 1) % layouts.length;
		value = layouts[layoutIndex].name;
	};
</script>

<div>
	{#each layouts as l, i}
		{#if i === layoutIndex}
			<IconButton title={l.name + ' layout'} on:click={nextLayout}>
				<svelte:component this={l.component} class={className} />
			</IconButton>
		{/if}
	{/each}
</div>
