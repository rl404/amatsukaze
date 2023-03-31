<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import Head from '$lib/components/Head.svelte';
	import type { statsResponse } from './+page.server';
	import AgencyCount from './AgencyCount.svelte';
	import Card from './Card.svelte';
	import VtuberAvgActiveTime from './VtuberAvgActiveTime.svelte';
	import VtuberAvgHeight from './VtuberAvgHeight.svelte';
	import VtuberAvgWeight from './VtuberAvgWeight.svelte';
	import VtuberCount from './VtuberCount.svelte';
	import VtuberCount2D3DChart from './VtuberCount2D3DChart.svelte';
	import VtuberCountBirthdayChart from './VtuberCountBirthdayChart.svelte';
	import VtuberCountBy2DModelerChart from './VtuberCountBy2DModelerChart.svelte';
	import VtuberCountBy3DModelerChart from './VtuberCountBy3DModelerChart.svelte';
	import VtuberCountByAgencyChart from './VtuberCountByAgencyChart.svelte';
	import VtuberCountByBloodChart from './VtuberCountByBloodChart.svelte';
	import VtuberCountByChannelChart from './VtuberCountByChannelChart.svelte';
	import VtuberCountByDesignerChart from './VtuberCountByDesignerChart.svelte';
	import VtuberCountByGenderChart from './VtuberCountByGenderChart.svelte';
	import VtuberCountByInAgencyChart from './VtuberCountByInAgencyChart.svelte';
	import VtuberCountByZodiacChart from './VtuberCountByZodiacChart.svelte';
	import VtuberCountMonthlyChart from './VtuberCountMonthlyChart.svelte';
	import VtuberCountStatusChart from './VtuberCountStatusChart.svelte';
	import VtuberCountYearlyChart from './VtuberCountYearlyChart.svelte';
	import VtuberLongestActiveTimeChart from './VtuberLongestActiveTimeChart.svelte';

	export let data: statsResponse;

	const vtubers = data.vtubers.data;
	const agencies = data.agencies.data;
</script>

<Head title="Statistics" description="Vtuber and agency statistics." image="/statistics.png" />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6 text-3xl font-bold">
		Statistics
		<Border />
	</div>
	<Card class="col-span-3 sm:col-span-2" title="Vtuber Count">
		<VtuberCount data={vtubers} />
	</Card>
	<Card class="col-span-3 sm:col-span-2" title="Agency Count">
		<AgencyCount data={agencies} />
	</Card>
	<Card class="col-span-6 sm:col-span-2" title="Vtuber Average Active Time">
		<VtuberAvgActiveTime data={vtubers} />
	</Card>
	<Card class="col-span-6 hidden md:block" title="Vtuber Count by Month">
		<VtuberCountMonthlyChart data={vtubers} />
	</Card>
	<Card class="col-span-6 md:hidden" title="Vtuber Count by Year">
		<VtuberCountYearlyChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Status">
		<VtuberCountStatusChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by 2D & 3D Model">
		<VtuberCount2D3DChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by in Agency">
		<VtuberCountByInAgencyChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Agency">
		<VtuberCountByAgencyChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-6" title="Top Longest Active Time Vtuber (Years)">
		<VtuberLongestActiveTimeChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-6" title="Vtuber Count by Birthday">
		<VtuberCountBirthdayChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-2" title="Vtuber Count by Character Designer">
		<VtuberCountByDesignerChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-2" title="Vtuber Count by Character 2D Modeler">
		<VtuberCountBy2DModelerChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-2" title="Vtuber Count by Character 3D Modeler">
		<VtuberCountBy3DModelerChart data={vtubers} />
	</Card>
	<Card class="col-span-3 sm:col-span-3" title="Vtuber Average Height">
		<VtuberAvgHeight data={vtubers} />
	</Card>
	<Card class="col-span-3 sm:col-span-3" title="Vtuber Average Weight">
		<VtuberAvgWeight data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Blood Type">
		<VtuberCountByBloodChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Channel Type">
		<VtuberCountByChannelChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Gender">
		<VtuberCountByGenderChart data={vtubers} />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Count by Zodiac">
		<VtuberCountByZodiacChart data={vtubers} />
	</Card>
</div>
