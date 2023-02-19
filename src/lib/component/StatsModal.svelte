<script lang="ts">
	export let title: string = '';

	let showModal: boolean = false;

	export const toggleModal = () => {
		showModal = !showModal;
	};
</script>

{#if showModal}
	<div class="fixed top-0 left-0 right-0 z-10 w-full p-4 overflow-x-hidden overflow-y-auto h-full">
		<div
			class="fixed top-0 left-0 right-0 w-full h-full bg-gray-800 opacity-70"
			on:click={toggleModal}
			on:keypress={toggleModal}
		/>
		<div
			class="relative w-full h-full max-w-md max-h-full overflow-x-hidden overflow-y-scroll z-20 m-auto rounded-lg"
		>
			<div class="relative bg-white shadow rounded-lg">
				<div class="flex items-start justify-between p-4 border-b rounded-t border-yellow-500">
					<h3 class="text-xl font-semibold">{title}</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-yellow-200 hover:text-yellow-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
						on:click={toggleModal}
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
				<div class="p-6">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
