<script lang="ts">
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	export { className as class };
	let className: string = '';
</script>

<SpinnerIcon
	class="{className} m-auto animate-spin fill-primary text-border dark:fill-primary-dark dark:text-border-dark"
/>
