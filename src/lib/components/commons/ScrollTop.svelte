<script lang="ts">
	import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte';

	let hidden: boolean = true;

	const onScroll = () => {
		const container = document.documentElement || document.body;
		if (!container) return;
		hidden = container.scrollTop <= 150;
	};

	const onClick = () => {
		const container = document.documentElement || document.body;
		container.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<svelte:window on:scroll={onScroll} />

<div class="fixed bottom-0 right-0 p-5" title="scroll to top" class:hidden>
	<button
		class="clickable rounded-full bg-primary p-3 text-white dark:bg-primary-dark"
		on:click={onClick}
	>
		<ChevronUpIcon class="h-4 w-4" />
	</button>
</div>
