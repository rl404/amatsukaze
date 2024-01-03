<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import AgencyCount from './AgencyCount.svelte';
	import AgencyMostSubsChart from './AgencyMostSubsChart.svelte';
	import Card from './Card.svelte';
	import VtuberAvgActiveTime from './VtuberAvgActiveTime.svelte';
	import VtuberAvgHeight from './VtuberAvgHeight.svelte';
	import VtuberAvgVideoCount from './VtuberAvgVideoCount.svelte';
	import VtuberAvgVideoLength from './VtuberAvgVideoLength.svelte';
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
	import VtuberCountByStatusChart from './VtuberCountByStatusChart.svelte';
	import VtuberCountBySubsChart from './VtuberCountBySubsChart.svelte';
	import VtuberCountByZodiacChart from './VtuberCountByZodiacChart.svelte';
	import VtuberCountMonthlyChart from './VtuberCountMonthlyChart.svelte';
	import VtuberCountVideoFrequencyChart from './VtuberCountVideoFrequencyChart.svelte';
	import VtuberCountYearlyChart from './VtuberCountYearlyChart.svelte';
	import VtuberLongestActiveTimeChart from './VtuberLongestActiveTimeChart.svelte';
	import VtuberMostSubsChart from './VtuberMostSubsChart.svelte';
	import VtuberMostVideoCount from './VtuberMostVideoCount.svelte';
	import VtuberMostVideoLength from './VtuberMostVideoLength.svelte';
</script>

<Head
	title="Statistics"
	description="Explore in-depth Vtuber and agency statistics with our comprehensive charts. Discover total Vtuber and agency counts, average active times, monthly debut and retirement trends, 2D and 3D model preferences, subscriber ranks, and more. Dive into the data shaping the virtual entertainment landscape."
	image="/statistics.png"
/>

<div class="grid grid-cols-6 gap-4">
	<h1 class="col-span-6 text-3xl font-bold">Statistics</h1>
	<Border class="col-span-6" />
	<Card class="col-span-3 sm:col-span-2" title="Vtuber Count">
		<VtuberCount />
	</Card>
	<Card class="col-span-3 sm:col-span-2" title="Agency Count">
		<AgencyCount />
	</Card>
	<Card class="col-span-6 sm:col-span-2" title="Vtuber Average Active Time">
		<VtuberAvgActiveTime />
	</Card>
	<Card class="col-span-6 hidden aspect-card md:block" title="Vtuber Debut & Retire Count by Month">
		<VtuberCountMonthlyChart />
	</Card>
	<Card class="col-span-6 aspect-card md:hidden" title="Vtuber Debut & Retire Count Count by Year">
		<VtuberCountYearlyChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Status">
		<VtuberCountByStatusChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by 2D & 3D Model">
		<VtuberCount2D3DChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by in Agency">
		<VtuberCountByInAgencyChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Agency">
		<VtuberCountByAgencyChart />
	</Card>
	<Card class="col-span-6 aspect-card2" title="Vtuber Count by Subscriber">
		<VtuberCountBySubsChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Most Subscriber">
		<VtuberMostSubsChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Agency Most Subscriber">
		<AgencyMostSubsChart />
	</Card>
	<Card class="col-span-6 aspect-card2" title="Top Longest Active Time Vtuber (Years)">
		<VtuberLongestActiveTimeChart />
	</Card>
	<Card class="col-span-6 aspect-square sm:col-span-2" title="Vtuber Count by Designer">
		<VtuberCountByDesignerChart />
	</Card>
	<Card class="col-span-6 aspect-square sm:col-span-2" title="Vtuber Count by 2D Modeler">
		<VtuberCountBy2DModelerChart />
	</Card>
	<Card class="col-span-6 aspect-square sm:col-span-2" title="Vtuber Count by 3D Modeler">
		<VtuberCountBy3DModelerChart />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Average Video Count">
		<VtuberAvgVideoCount />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Average Video Duration">
		<VtuberAvgVideoLength />
	</Card>
	<Card class="col-span-6 aspect-card2" title="Vtuber Most Video Count">
		<VtuberCountVideoFrequencyChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Average Video Count">
		<VtuberMostVideoCount />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Longest Average Video Duration">
		<VtuberMostVideoLength />
	</Card>
	<Card class="col-span-6 aspect-card" title="Vtuber Count by Birthday">
		<VtuberCountBirthdayChart />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Average Height">
		<VtuberAvgHeight />
	</Card>
	<Card class="col-span-6 sm:col-span-3" title="Vtuber Average Weight">
		<VtuberAvgWeight />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Blood Type">
		<VtuberCountByBloodChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Channel Type">
		<VtuberCountByChannelChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Gender">
		<VtuberCountByGenderChart />
	</Card>
	<Card class="col-span-6 aspect-video sm:col-span-3" title="Vtuber Count by Zodiac">
		<VtuberCountByZodiacChart />
	</Card>
</div>
