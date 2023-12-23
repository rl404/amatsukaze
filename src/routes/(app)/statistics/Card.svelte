<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';

	export let title: string;
	export { className as class };
	let className = '';
</script>

<RenderIfVisible
	class="{className} grid gap-2 rounded-lg border border-border p-2 dark:border-border-dark"
>
	<h2 class="text-center font-bold">{title}</h2>
	<slot />
</RenderIfVisible>
