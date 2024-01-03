<script lang="ts">
	export { className as class };
	let className: string = '';
</script>

<div class="{className} inline-flex w-full items-center justify-center">
	<hr />
	<slot />
	<hr />
</div>
