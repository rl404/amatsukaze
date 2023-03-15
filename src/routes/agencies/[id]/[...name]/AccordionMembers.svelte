<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { getAxiosError } from '$lib/utils';
	import axios from 'axios';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';
	import MembersTimeline from './MembersTimeline.svelte';

	export let agency: string;

	let vtubers: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';
	let open: boolean = true;

	$: open && fetchData();

	const fetchData = () => {
		loading = true;
		error = '';

		axios
			.get(`/api/vtubers?agency=${agency}&limit=-1`)
			.then((resp) => {
				vtubers = resp.data.data;
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<Accordion title="Members" bind:open>
	<div class="grid gap-2">
		{#if loading}
			<div>
				<SpinnerIcon class="w-6 h-6 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
			</div>
		{:else if error !== ''}
			<div class="text-center text-red-500">
				{error}
			</div>
		{:else if vtubers.length === 0}
			<div class="text-center">no vtubers found...</div>
		{:else}
			<MembersTimeline data={vtubers} />
		{/if}
	</div>
</Accordion>
