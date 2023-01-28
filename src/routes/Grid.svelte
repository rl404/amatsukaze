<script lang="ts">
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
</script>

<div
	class="overflow-hidden grid xl:grid-cols-10 lg:grid-cols-7 md:grid-cols-5 grid-cols-3 h-screen gap-1 p-1"
>
	{#each vtubers as vtuber}
		<div
			class="transition bg-no-repeat bg-cover bg-top pb-[90%] grayscale hover:grayscale-0 opacity-20 hover:opacity-100 rounded hover:outline-yellow-500 hover:outline hover:drop-shadow-lg"
			style="background-image:url(/api/wikia/image/{vtuber.image})"
			on:mouseover={() => handleOnHover(vtuber.id)}
			on:mouseout={handleOnUnhover}
			on:focus={() => handleOnHover(vtuber.id)}
			on:blur={handleOnUnhover}
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
