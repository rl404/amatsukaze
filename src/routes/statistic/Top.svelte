<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="w-full flex justify-between items-center ">
	<div class="flex">
		<a href="/">
			<button
				class="bg-white hover:bg-yellow-500 rounded-full p-2 text-center hover:text-white border border-yellow-500"
				title="Back"
			>
				<Fa icon={faChevronLeft} class="w-4 h-4" />
			</button>
		</a>
		<div class="p-2 bg-white border border-yellow-500 mr-2 ml-2 rounded-full">
			<div class="h-4 leading-4 overflow-hidden">Vtuber Statistics</div>
		</div>
	</div>
</div>
