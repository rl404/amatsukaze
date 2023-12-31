<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import XmarkIcon from '$lib/components/icons/XmarkIcon.svelte';

	export { className as class };
	export const toggleOpen = () => (open = !open);

	let open: boolean = false;
	let className: string = '';

	const onClose = () => (open = false);
</script>

{#if open}
	<div class="fixed left-0 top-0 z-20 h-full w-full p-4">
		<button
			class="fixed left-0 top-0 h-full w-full cursor-default bg-neutral-800 opacity-70"
			on:click={onClose}
		/>

		<div
			class="{className} relative m-auto h-auto max-h-full w-full overflow-y-scroll rounded-lg bg-modal dark:bg-modal-dark"
		>
			<div
				class="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-modal p-4 dark:border-border-dark dark:bg-modal-dark"
			>
				<slot name="header">Vtuber</slot>
				<IconButton title="close" on:click={onClose} class="p-1">
					<XmarkIcon class="h-5 w-5" />
				</IconButton>
			</div>

			<slot name="body" />

			<div
				class="sticky bottom-0 z-10 border-t border-border bg-modal dark:border-border-dark dark:bg-modal-dark"
			>
				<slot name="footer" />
			</div>
		</div>
	</div>
{/if}
