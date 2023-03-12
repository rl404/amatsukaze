<script lang="ts">
	import ChevronUpIcon from './icons/ChevronUpIcon.svelte';

	export let offset: number = 150;
	let hidden: boolean = true;

	const onScroll = () => {
		const container = document.documentElement || document.body;

		if (!container) return;

		if (container.scrollTop > offset) {
			hidden = false;
		} else {
			hidden = true;
		}
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

<div class="fixed right-0 bottom-0 p-5" title="scroll to top" class:hidden>
	<button type="button" class="bg-pink-500 dark:bg-indigo-600 text-white hover:opacity-70 p-3 rounded-full" on:click={onClick}>
		<ChevronUpIcon class="w-4 h-4" />
	</button>
</div>
