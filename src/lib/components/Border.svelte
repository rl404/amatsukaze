<script lang="ts">
	export { className as class };
	let className: string = '';
</script>

<div class="inline-flex items-center justify-center w-full {className}">
	<hr class="w-full h-px border-0 bg-neutral-200 dark:bg-neutral-600" />
	<slot />
	<hr class="w-full h-px border-0 bg-neutral-200 dark:bg-neutral-600" />
</div>
