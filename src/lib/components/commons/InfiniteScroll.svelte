<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let threshold: number | undefined = 100;
	export let horizontal: boolean | undefined = false;
	export let elementScroll: HTMLElement | null = null;
	export let hasMore: boolean | undefined = true;
	export let reverse: boolean | undefined = false;
	export let window: boolean | undefined = false;
	export let onLoadMore: () => void;

	let isLoadMore: boolean = false;
	let component: HTMLElement;
	let beforeScrollHeight: number;
	let beforeScrollTop: number;
	let element: any | null;

	$: if (element) {
		if (reverse) {
			element.scrollTop = element.scrollHeight;
		}
		element.addEventListener('scroll', onScroll);
		element.addEventListener('resize', onScroll);
	}

	$: if (isLoadMore && reverse) {
		element.scrollTop = element.scrollHeight - beforeScrollHeight + beforeScrollTop;
	}

	const onScroll = (e: Event) => {
		if (!hasMore) return;

		const target = e.target as HTMLElement;
		const offset = calcOffset(target, reverse!, horizontal!);

		if (offset <= threshold!) {
			if (!isLoadMore && hasMore) {
				onLoadMore();
				beforeScrollHeight = target.scrollHeight;
				beforeScrollTop = target.scrollTop;
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};

	const calcOffset = (target: any, reverse: boolean, horizontal: boolean) => {
		const element: HTMLElement = target.documentElement ? target.documentElement : target;

		if (reverse) {
			return horizontal ? element.scrollLeft : element.scrollTop;
		}

		return horizontal
			? element.scrollWidth - element.clientWidth - element.scrollLeft
			: element.scrollHeight - element.clientHeight - element.scrollTop;
	};

	onMount(() => {
		if (window) {
			element = document;
		} else if (elementScroll) {
			element = elementScroll;
		} else {
			element = component.parentNode;
		}
	});

	onDestroy(() => {
		if (element) {
			element.removeEventListener('scroll', onScroll);
			element.removeEventListener('resize', onScroll);
		}
	});
</script>

{#if !window && !elementScroll}
	<div bind:this={component} class="w-0" />
{/if}
