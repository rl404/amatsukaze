<script lang="ts">
	import ImageIcon from '../icons/ImageIcon.svelte';

	export { className as class };
	let className: string = '';
</script>

<div class="{className} animate-pulse aspect-square">
	<div class="flex items-center justify-center h-full w-full m-auto rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800">
		<ImageIcon class="w-1/4 text-neutral-300 dark:text-neutral-300" />
	</div>
</div>
