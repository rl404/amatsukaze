<script lang="ts">
	import Image from '../Image.svelte';
	import RenderIfVisible from '../RenderIfVisible.svelte';

	export let id: number;
	export let name: string;
	export let image: string;

	export let height: number;
	export { className as class };
	let className: string = '';
	export { className2 as class2 };
	let className2: string = '';
	export let smallText: boolean = false;
</script>

<a href="/agencies/{id}/{name}" class={className} data-sveltekit-reload title={name}>
	<RenderIfVisible
		class="{className2} aspect-video group bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:outline hover:outline-pink-500 dark:hover:outline-indigo-600 drop-shadow hover:drop-shadow-lg cursor-pointer"
	>
		<Image
			src={image && `/api/wikia/image/${image.split('?')[0]}?height=${height}`}
			alt={name}
			class="p-2 h-full w-full object-contain object-center rounded-lg"
		/>
		<div
			class="absolute bottom-0 w-full font-bold text-white text-center opacity-0 group-hover:opacity-100 bg-pink-500 dark:bg-indigo-600 p-0.5 text-ellipsis whitespace-nowrap overflow-hidden pointer-events-none {smallText &&
				'sm:text-sm'}"
		>
			{name}
		</div>
	</RenderIfVisible>
</a>
