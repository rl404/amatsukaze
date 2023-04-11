<script lang="ts">
	import RenderIfVisible from '$lib/components/RenderIfVisible.svelte';

	export let title: string;
	export { className as class };
	let className = '';
</script>

<RenderIfVisible class="{className} bg-white dark:bg-neutral-900 rounded-lg border dark:border-neutral-600 p-2 grid gap-2">
	<div class="text-center font-bold">{title}</div>
	<slot />
</RenderIfVisible>
