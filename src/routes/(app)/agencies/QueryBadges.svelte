<script lang="ts">
	import TagsIcon from '$lib/components/icons/TagsIcon.svelte';
	import { Badge } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let name: string;

	const onClose = () => {
		name = '';
		dispatch('change');
	};
</script>

<div class="flex flex-wrap items-center gap-2">
	<TagsIcon class="size-4" />
	{#if name !== ''}
		<Badge dismissable on:close={onClose}>
			Name: {name}
		</Badge>
	{/if}
</div>
