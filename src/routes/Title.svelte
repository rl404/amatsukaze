<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import amatsukaze from '$lib/assets/amatsukaze.png';

	let hover: boolean = false;

	const onHover = () => {
		hover = true;
	};

	const onUnhover = () => {
		hover = false;
	};

	let open: boolean = true;

	const toggleOpen = () => {
		open = !open;
	};
</script>

<div
	class="bg-gradient-to-r from-yellow-100 to-yellow-500 absolute left-0 w-full top-2/3 p-5 text-right text-white drop-shadow-lg transition {!open &&
		'translate-x-full'}"
	on:mouseover={onHover}
	on:mouseout={onUnhover}
	on:focus={onHover}
	on:blur={onUnhover}
>
	<div
		id="title-background"
		class="block w-full absolute h-full top-0 left-0 opacity-20 bg-no-repeat"
		style="background-image: url({amatsukaze})"
	/>

	<div
		class="bg-gradient-to-r from-yellow-100 to-yellow-500 absolute w-full h-1 block -top-2 left-0"
	/>
	<div
		class="bg-gradient-to-r from-yellow-100 to-yellow-500 absolute w-full h-1 block -bottom-2 left-0"
	/>

	<div class="text-l sm:text-xl drop-shadow-lg">
		<a
			href="https://virtualyoutuber.fandom.com"
			target="_blank"
			rel="noreferrer"
			class="hover:text-yellow-200">Vtuber Wikia</a
		>
		Visualizer
	</div>

	<div class="text-5xl sm:text-6xl font-bold mb-1 drop-shadow-lg pointer-events-none">
		Amatsukaze
	</div>

	<div
		class="text-xl sm:text-2xl drop-shadow-lg grid sm:flex sm:flex-row sm:place-content-end text-right"
	>
		<div class="whitespace-nowrap">
			<a href="/family" class="hover:text-yellow-200">Family Tree</a><span
				class="opacity-50 hidden sm:inline-block sm:ml-1 sm:mr-1">|</span
			>
		</div>
		<div class="whitespace-nowrap">
			<a href="/agency" class="hover:text-yellow-200">Agency Tree</a><span
				class="opacity-50 hidden sm:inline-block sm:ml-1 sm:mr-1">|</span
			>
		</div>
		<div class="whitespace-nowrap">
			<a href="/statistic" class="hover:text-yellow-200">Statistics</a><span
				class="opacity-50 hidden sm:inline-block sm:ml-1 sm:mr-1">|</span
			>
		</div>
		<div class="whitespace-nowrap">
			<a
				href="https://github.com/rl404/amatsukaze"
				target="_blank"
				rel="noreferrer"
				class="hover:text-yellow-200"><Fa icon={faGithub} pull="right" translateY={0.2} /></a
			>
		</div>
	</div>

	<button
		class:hidden={!hover && open}
		class="absolute top-1/2 left-0 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-800 {open
			? 'rounded-r-full'
			: 'rounded-l-full'} p-2 text-center {!open && '-left-8'}"
		on:click={toggleOpen}
	>
		<Fa icon={open ? faChevronRight : faChevronLeft} class="w-4 h-4" />
	</button>
</div>
