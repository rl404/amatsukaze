<script lang="ts">
	import { onMount } from 'svelte';

	type vtuberImage = {
		id: number;
		name: string;
		image: string;
	};

	export let vtubers: Array<vtuberImage>;

	let onHoverID = 0;

	const handleOnHover = (id: number) => {
		onHoverID = id;
	};

	const handleOnUnhover = () => {
		onHoverID = 0;
	};

	let divs: Array<HTMLElement> = [];

	onMount(() => {
		divs.forEach((d) => {
			d.style.display = 'block';
		});
	});
</script>

<div
	class="overflow-hidden grid xl:grid-cols-10 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 h-screen gap-1 p-1"
>
	{#each vtubers as vtuber, i}
		<div
			class="hidden transition bg-no-repeat bg-cover bg-top pb-[90%] grayscale hover:grayscale-0 opacity-20 hover:opacity-100 rounded hover:outline-yellow-500 hover:outline hover:drop-shadow-lg"
			style="background-image:url(/api/wikia/image/{vtuber.image.split('?')[0]}?width=200)"
			on:mouseover={() => handleOnHover(vtuber.id)}
			on:mouseout={handleOnUnhover}
			on:focus={() => handleOnHover(vtuber.id)}
			on:blur={handleOnUnhover}
			bind:this={divs[i]}
		>
			<div
				class="transition absolute w-full bottom-0 bg-yellow-500 rounded-br rounder-bl text-white p-0.5 text-center text-ellipsis whitespace-nowrap overflow-hidden opacity-0 {onHoverID ===
					vtuber.id && 'opacity-100'}"
			>
				{vtuber.name}
			</div>
		</div>
	{/each}
</div>
