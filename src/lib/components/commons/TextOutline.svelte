<script lang="ts">
	export { className as class };
	let className: string = '';
</script>

<svg class={className} viewBox="0 0 200 40" width="1000px" height="250px">
	<text class="hidden dark:block" y="25" fill="none" stroke="white" stroke-width="0.2px">
		<slot />
	</text>
	<text class="block dark:hidden" y="25" fill="none" stroke="black" stroke-width="0.2px">
		<slot />
	</text>
</svg>
