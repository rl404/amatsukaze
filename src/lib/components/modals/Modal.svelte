<script lang="ts">
	import IconButton from '../buttons/IconButton.svelte';
	import XmarkIcon from '../icons/XmarkIcon.svelte';

	export let maxWidthClass: string = 'max-w-md';

	let open: boolean = false;

	export const toggleOpen = () => {
		open = !open;
	};
</script>

<div class="fixed top-0 left-0 z-20 p-4 w-full h-full" class:hidden={!open}>
	<div class="fixed top-0 left-0 w-full h-full bg-neutral-800 opacity-70" on:click={toggleOpen} />

	<div class="relative w-full h-auto {maxWidthClass} max-h-full m-auto rounded-lg z-10 bg-white dark:bg-neutral-700 shadow overflow-y-scroll">
		<div class="sticky top-0 z-10 bg-white dark:bg-neutral-700 flex items-start justify-between p-4 border-b dark:border-neutral-600">
			<div class="text-xl font-bold">
				<slot name="title">Vtuber</slot>
			</div>
			<IconButton title="close" on:click={toggleOpen}>
				<XmarkIcon class="w-5 h-5" />
			</IconButton>
		</div>

		<slot name="body" />

		<slot name="footer" />
	</div>
</div>
