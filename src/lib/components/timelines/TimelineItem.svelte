<script lang="ts">
	export let id: string = '';
</script>

<div {id} class="relative grid grid-cols-2">
	<div class="absolute top-6 -left-1.5 md:left-1/2 md:-translate-x-1/2 md:transform">
		<slot name="dot" />
	</div>

	<div class="order-2 col-span-2 md:order-1 md:col-span-1">
		<slot name="left" />
	</div>

	<div class="order-1 col-span-2 md:order-2 md:col-span-1">
		<slot name="right" />
	</div>
</div>
