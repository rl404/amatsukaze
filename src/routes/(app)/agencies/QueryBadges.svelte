<script lang="ts">
	import TagsIcon from '$lib/components/icons/TagsIcon.svelte';
	import { Badge } from 'flowbite-svelte';

	export let name: string;
	export let onChange: () => void;

	const onClose = () => {
		name = '';
		onChange();
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
