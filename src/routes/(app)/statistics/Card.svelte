<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let title: string;
	export { className as class };

	let className: string = '';
</script>

<Card size="none" padding="xs" class={twMerge('gap-2 text-center', className)}>
	<h5 class="h5">{title}</h5>
	<RenderIfVisible class="h-full w-full">
		<slot />
	</RenderIfVisible>
</Card>
