<script lang="ts">
	export { addClass as class };
	let addClass = '';
</script>

<div class="w-full border border-yellow-500 rounded-lg shadow p-2 {addClass}">
	<slot />
</div>
