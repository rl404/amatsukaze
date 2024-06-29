<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import ImageIcon from '../icons/ImageIcon.svelte';

	export let src: string;
	export let alt: string;
	export let delay: number = 0;
	export let loadingClass: string = '';
	export let errorClass: string = '';
	export { className as class };

	let className: string = '';
	let loading: boolean = true;
	let error: boolean = false;
	let timer: number;
	let observer: IntersectionObserver;
	let observed: boolean = false;
	let element: HTMLElement;

	onMount(() => {
		if (src === '') return;
		observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
		element && observer.observe(element);
	});

	onDestroy(() => {
		observer && observer.disconnect();
		clearTimeout(timer);
	});

	const loadImage = () => {
		const img = new Image();
		img.src = src;

		img.onload = () => {
			loading = false;
		};

		img.onerror = () => {
			loading = false;
			error = true;
		};
	};

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				observed = true;
				timer = setTimeout(() => {
					observed && loadImage();
				}, delay);
			} else {
				observed = false;
				clearTimeout(timer);
			}
		});
	};
</script>

{#if src === '' || error}
	<div
		bind:this={element}
		class={twMerge(
			'flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-primary-100 p-1 text-center dark:to-primary-950',
			errorClass,
			className
		)}
	>
		{alt}
	</div>
{:else if loading}
	<div
		bind:this={element}
		class={twMerge(
			'flex animate-pulse items-center justify-center bg-gradient-to-b from-transparent to-primary-100 dark:to-primary-950',
			loadingClass,
			className
		)}
	>
		<ImageIcon class="size-1/6" />
	</div>
{:else}
	<img
		bind:this={element}
		{src}
		{alt}
		class={twMerge(
			'bg-gradient-to-b from-transparent to-primary-100 dark:to-primary-950',
			className
		)}
	/>
{/if}
