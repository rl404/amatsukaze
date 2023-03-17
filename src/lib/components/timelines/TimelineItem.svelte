<script lang="ts">
	export let id: string = '';
	export let dotClass: string = 'bg-neutral-200 dark:bg-neutral-600';
	export let leftClass: string = '';
	export let rightClass: string = '';
</script>

<div class="grid grid-cols-2 relative" {id}>
	<div class="absolute w-3 h-3 -left-1.5 md:left-1/2 md:transform md:-translate-x-1/2 rounded-full {dotClass}" />

	<div class="col-span-2 md:col-span-1 {leftClass}">
		<slot name="left" />
	</div>

	<div class="col-span-2 md:col-span-1 {rightClass}">
		<slot name="right" />
	</div>
</div>
