<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import ChevronUpIcon from '../icons/ChevronUpIcon.svelte';

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

<div
	class={twMerge(
		'fixed bottom-0 right-0 z-10 p-8 transition',
		hidden ? 'opacity-0' : 'opacity-100'
	)}
>
	<Button pill class="!p-4" on:click={onClick}>
		<ChevronUpIcon class="size-5" />
	</Button>
</div>
