<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faQuestion, faSearch, faRemove } from '@fortawesome/free-solid-svg-icons';
	import Divider from '$lib/component/Divider.svelte';

	const dispatch = createEventDispatcher();

	export let searchQuery = '';

	$: searchQuery, dispatch('change', { search: searchQuery });

	let searchShow = false;

	const showSearch = () => {
		searchShow = true;
	};

	const hideSearch = () => {
		searchShow = false;
	};

	let helpShow = false;

	const toggleHelp = () => {
		helpShow = !helpShow;
	};

	const hideHelp = () => {
		helpShow = false;
	};

	const nextSearchResult = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatch('next');
	};
</script>

<div class="absolute top-0 p-2 w-full flex justify-between items-center">
	<a href="/">
		<button
			class="bg-white hover:bg-yellow-500 rounded-full p-2 text-center hover:text-white border border-yellow-500"
			title="Back"
		>
			<Fa icon={faChevronLeft} class="w-4 h-4" />
		</button>
	</a>
	<div class="flex">
		{#if searchQuery === '' && !searchShow}
			<button
				class="bg-white hover:bg-yellow-500 rounded-full p-2 text-center mr-2 ml-2 hover:text-white border border-yellow-500"
				title="Search"
				on:click={showSearch}
			>
				<Fa icon={faSearch} class="w-4 h-4" />
			</button>
		{:else}
			<div class="relative mr-2 ml-2" title="Search">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<Fa icon={faSearch} class="w-4 h-4" />
				</div>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					class="border border-yellow-300 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block pl-10 pr-10 p-1 outline-none w-full h-full"
					placeholder="search..."
					autofocus
					bind:value={searchQuery}
					on:blur={hideSearch}
					on:focus={showSearch}
					on:keydown={nextSearchResult}
				/>
				<button
					class="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-red-500"
					on:click={() => dispatch('reset')}
				>
					<Fa icon={faRemove} class="w-4 h-4" />
				</button>
			</div>
		{/if}
		<div>
			<button
				class="bg-white hover:bg-yellow-500 rounded-full p-2 text-center hover:text-white border border-yellow-500"
				title="Help"
				on:click={toggleHelp}
			>
				<Fa icon={faQuestion} class="w-4 h-4" />
			</button>
		</div>
	</div>
</div>

{#if helpShow}
	<div class="absolute right-2 bg-white" style="top:50px;">
		<div class="border border-yellow-500 rounded-lg p-2 grid grid-cols-1 gap-1 w-52">
			<div class="font-bold"><Divider>Colors</Divider></div>
			<div>
				<span class="h-3 w-3 bg-yellow-500 rounded-xl inline-block ml-2 mr-3" />Active Vtuber
			</div>
			<div>
				<span class="h-3 w-3 bg-yellow-800 rounded-xl inline-block ml-2 mr-3" />Retired Vtuber
			</div>
			<div>
				<span class="h-3 w-3 bg-blue-500 rounded-xl inline-block ml-2 mr-3" />Agency
			</div>
			<div>
				<span
					class="h-3 w-3 text-blue-500 inline-block ml-1.5 mr-3 text-center font-bold pointer-events-none"
					>—</span
				>Agency Member
			</div>
			<div class="font-bold"><Divider>Actions</Divider></div>
			<div><code>Left-click</code> the <code>node</code> to show vtuber details.</div>
			<div><code>Right-click</code> the <code>node</code> to show vtuber picture.</div>
			<div>
				<code>Left-click</code> the <code>background</code> to unfocus the <code>node</code>.
			</div>
			<div><code>Right-click</code> the <code>background</code> to hide all vtuber pictures.</div>
			<div><hr /></div>
			<div class="text-right">
				<button
					class="bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg px-2 py-1 text-sm"
					on:click={hideHelp}
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
