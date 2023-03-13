<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import Image from '$lib/components/Image.svelte';
	import type { vtuberResponse } from '../../../api/vtubers/[id]/+server';
	import AccordionDetails from './AccordionDetails.svelte';

	export let data: vtuberResponse;

	const vtuber = data.data;
</script>

<Head
	title={vtuber.name}
	description="Visualize vtuber data from wikia to a page."
	image={vtuber.image && `/api/wikia/image/${vtuber.image.split('?')[0]}?height=206`}
/>

<div class="grid grid-cols-4 gap-4">
	<div class="col-span-4">
		<div class="text-3xl font-bold">{vtuber.name} <span title="Emoji">{vtuber.emoji}</span></div>
		<Border />
	</div>

	<div class="flex flex-col gap-4">
		<div>
			<Image
				src={vtuber.image && `/api/wikia/image/${vtuber.image.split('?')[0]}?height=206`}
				alt={vtuber.name}
				class="m-auto w-full rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
			/>
		</div>
		<div class="italic text-center opacity-70" title="quote">{vtuber.caption}</div>
	</div>

	<div class="col-span-3 flex flex-col gap-4">
		<div><AccordionDetails data={vtuber} /></div>
		<div><Accordion title="Agency-mates" /></div>
	</div>
</div>
