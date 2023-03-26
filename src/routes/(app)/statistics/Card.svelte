<script lang="ts">
	export let title: string;
	export { addClass as class };
	let addClass = '';
</script>

<div class="rounded-lg border dark:border-neutral-600 p-2 {addClass} grid gap-2">
	<div class="text-center font-bold">{title}</div>
	<slot />
</div>
