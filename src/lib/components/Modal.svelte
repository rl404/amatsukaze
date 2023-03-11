<script lang="ts">
	import IconButton from './IconButton.svelte';

	export let maxWidthClass: string = 'max-w-md';

	let open: boolean = false;

	export const toggleOpen = () => {
		open = !open;
	};
</script>

{#if open}
	<div class="fixed top-0 left-0 z-10 p-4 w-full h-full">
		<div class="fixed top-0 left-0 w-full h-full bg-neutral-800 opacity-70" on:click={toggleOpen} />

		<div class="relative w-full h-auto {maxWidthClass} max-h-full m-auto rounded-lg z-20 bg-white dark:bg-neutral-700 shadow overflow-y-scroll">
			<div class="sticky top-0 z-30 bg-white dark:bg-neutral-700 flex items-start justify-between p-4 border-b dark:border-neutral-600">
				<div class="text-xl font-bold">
					<slot name="title">Vtuber</slot>
				</div>
				<IconButton title="close" on:click={toggleOpen}>
					<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</IconButton>
			</div>

			<slot name="body" />

			<slot name="footer" />
		</div>
	</div>
{/if}
