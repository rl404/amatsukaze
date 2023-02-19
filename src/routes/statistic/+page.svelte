<script lang="ts">
	import Head from '$lib/component/Head.svelte';
	import type { vtubersResponse } from './+page.server';
	import Card from './Card.svelte';
	import ChartAgency from './ChartAgency.svelte';
	import ChartBirthday from './ChartBirthday.svelte';
	import ChartBloodType from './ChartBloodType.svelte';
	import ChartChannel from './ChartChannel.svelte';
	import ChartDebutDate from './ChartDebutDate.svelte';
	import ChartGender from './ChartGender.svelte';
	import ChartIllustrator from './ChartIllustrator.svelte';
	import ChartModeler2D from './ChartModeler2D.svelte';
	import ChartModeler3D from './ChartModeler3D.svelte';
	import ChartStatus from './ChartStatus.svelte';
	import ChartZodiac from './ChartZodiac.svelte';
	import CountAgency from './CountAgency.svelte';
	import CountVtuber from './CountVtuber.svelte';
	import Top from './Top.svelte';

	export let data: vtubersResponse;
</script>

<Head title="Statistics" description="Visualize vtuber data from wikia to statistics." />

<div class="p-4">
	<Top />

	<div class="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
		<Card class="md:col-span-2">
			<CountVtuber data={data.data} />
		</Card>
		<Card class="md:col-span-2">
			<CountAgency data={data.data} />
		</Card>
		<Card class="sm:col-span-2 md:col-span-4 xl:col-span-2">
			<ChartDebutDate data={data.data} />
		</Card>
		<Card class="sm:col-span-2 md:col-span-2 xl:col-span-1">
			<ChartStatus data={data.data} />
		</Card>
		<Card class="sm:col-span-2 md:col-span-2 xl:col-span-1">
			<ChartBirthday data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartAgency data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartIllustrator data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartModeler2D data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartModeler3D data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartBloodType data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartChannel data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartGender data={data.data} />
		</Card>
		<Card class="md:col-span-2 xl:col-span-1">
			<ChartZodiac data={data.data} />
		</Card>
	</div>
</div>
