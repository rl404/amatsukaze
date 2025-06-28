<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import { Card } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let title: string;
</script>

<Card class={twMerge('max-w-full gap-2 p-2 text-center', $$props.class)}>
	<h5 class="h5">{title}</h5>
	<RenderIfVisible class="size-full" once={false}>
		<slot />
	</RenderIfVisible>
</Card>
