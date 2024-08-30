<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import AgencyCount from './AgencyCount.svelte';
	import AgencyMostSubsChart from './AgencyMostSubsChart.svelte';
	import Card from './Card.svelte';
	import VtuberAvgActiveTime from './VtuberAvgActiveTime.svelte';
	import VtuberAvgHeight from './VtuberAvgHeight.svelte';
	import VtuberAvgVideoCount from './VtuberAvgVideoCount.svelte';
	import VtuberAvgVideoLength from './VtuberAvgVideoLength.svelte';
	import VtuberAvgWeight from './VtuberAvgWeight.svelte';
	import VtuberCount from './VtuberCount.svelte';
	import VtuberCountBirthdayChart from './VtuberCountBirthdayChart.svelte';
	import VtuberCountBy2D3DChart from './VtuberCountBy2D3DChart.svelte';
	import VtuberCountBy2DModelerChart from './VtuberCountBy2DModelerChart.svelte';
	import VtuberCountBy3DModelerChart from './VtuberCountBy3DModelerChart.svelte';
	import VtuberCountByAgencyChart from './VtuberCountByAgencyChart.svelte';
	import VtuberCountByBloodChart from './VtuberCountByBloodChart.svelte';
	import VtuberCountByChannelChart from './VtuberCountByChannelChart.svelte';
	import VtuberCountByDesignerChart from './VtuberCountByDesignerChart.svelte';
	import VtuberCountByGenderChart from './VtuberCountByGenderChart.svelte';
	import VtuberCountByInAgencyChart from './VtuberCountByInAgencyChart.svelte';
	import VtuberCountByLanguageChart from './VtuberCountByLanguageChart.svelte';
	import VtuberCountByStatusChart from './VtuberCountByStatusChart.svelte';
	import VtuberCountBySubsChart from './VtuberCountBySubsChart.svelte';
	import VtuberCountByZodiacChart from './VtuberCountByZodiacChart.svelte';
	import VtuberCountMonthlyChart from './VtuberCountMonthlyChart.svelte';
	import VtuberCountVideoFreqChart from './VtuberCountVideoFreqChart.svelte';
	import VtuberCountYearlyChart from './VtuberCountYearlyChart.svelte';
	import VtuberLongestActiveTimeChart from './VtuberLongestActiveTimeChart.svelte';
	import VtuberLongestVideoDurationChart from './VtuberLongestVideoDurationChart.svelte';
	import VtuberMostSubsChart from './VtuberMostSubsChart.svelte';
	import VtuberMostVideoCountChart from './VtuberMostVideoCountChart.svelte';
</script>

<Head
	title="Statistics"
	description="Explore in-depth Vtuber and agency statistics with our comprehensive charts. Discover total Vtuber and agency counts, average active times, monthly debut and retirement trends, 2D and 3D model preferences, subscriber ranks, and more. Dive into the data shaping the virtual entertainment landscape."
	image="/statistics.png"
/>

<div class="grid grid-cols-6 gap-4 overflow-hidden">
	<Breadcrumb class="col-span-6">
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Statistics</BreadcrumbItem>
	</Breadcrumb>
	<div class="relative col-span-6 flex items-center">
		<TextOutline class="absolute -z-10 opacity-20">Statistics</TextOutline>
		<h1 class="h1">Statistics</h1>
	</div>
	<Card title="Vtuber Count" class="col-span-3 md:col-span-2">
		<VtuberCount />
	</Card>
	<Card title="Agency Count" class="col-span-3 md:col-span-2">
		<AgencyCount />
	</Card>
	<Card title="Vtuber Average Active Time" class="col-span-6 md:col-span-2">
		<VtuberAvgActiveTime />
	</Card>
	<Card
		title="Vtuber Debut & Retire Count by Year"
		class="col-span-6 aspect-video sm:aspect-chart 2xl:hidden"
	>
		<VtuberCountYearlyChart />
	</Card>
	<Card
		title="Vtuber Debut & Retire Count by Month"
		class="col-span-6 hidden aspect-chart 2xl:block"
	>
		<VtuberCountMonthlyChart />
	</Card>
	<Card title="Vtuber Count by Status" class="col-span-6 aspect-video sm:col-span-3 2xl:col-span-2">
		<VtuberCountByStatusChart />
	</Card>
	<Card
		title="Vtuber Count by 2D & 3D Model"
		class="col-span-6 aspect-video sm:col-span-3 2xl:col-span-2"
	>
		<VtuberCountBy2D3DChart />
	</Card>
	<Card
		title="Vtuber Count by in Agency"
		class="col-span-6 aspect-video sm:col-span-3 2xl:col-span-2"
	>
		<VtuberCountByInAgencyChart />
	</Card>
	<Card title="Vtuber Count by Agency" class="col-span-6 aspect-video sm:col-span-3">
		<VtuberCountByAgencyChart />
	</Card>
	<Card
		title="Vtuber Count by Subscriber"
		class="col-span-6 aspect-video sm:aspect-chart 2xl:col-span-3 2xl:aspect-video"
	>
		<VtuberCountBySubsChart />
	</Card>
	<Card title="Most Subscriber Vtuber" class="col-span-6 aspect-video sm:col-span-3">
		<VtuberMostSubsChart />
	</Card>
	<Card title="Most Subscriber Agency" class="col-span-6 aspect-video sm:col-span-3">
		<AgencyMostSubsChart />
	</Card>
	<Card title="Longest Active Time Vtuber (Years)" class="col-span-6 aspect-video md:aspect-chart">
		<VtuberLongestActiveTimeChart />
	</Card>
	<Card
		title="Vtuber Count by Designer"
		class="col-span-6 aspect-video md:col-span-2 md:aspect-square 2xl:aspect-video"
	>
		<VtuberCountByDesignerChart />
	</Card>
	<Card
		title="Vtuber Count by 2D Modeler"
		class="col-span-6 aspect-video md:col-span-2 md:aspect-square 2xl:aspect-video"
	>
		<VtuberCountBy2DModelerChart />
	</Card>
	<Card
		title="Vtuber Count by 3D Modeler"
		class="col-span-6 aspect-video md:col-span-2 md:aspect-square 2xl:aspect-video"
	>
		<VtuberCountBy3DModelerChart />
	</Card>
	<Card title="Average Vtuber Video Count" class="col-span-3">
		<VtuberAvgVideoCount />
	</Card>
	<Card title="Average Vtuber Video Duration" class="col-span-3">
		<VtuberAvgVideoLength />
	</Card>
	<Card title="Vtuber Video Upload Count" class="col-span-6 aspect-chart">
		<VtuberCountVideoFreqChart />
	</Card>
	<Card title="Most Vtuber Video Count" class="col-span-6 aspect-video md:col-span-3">
		<VtuberMostVideoCountChart />
	</Card>
	<Card title="Longest Vtuber Video Duration" class="col-span-6 aspect-video md:col-span-3">
		<VtuberLongestVideoDurationChart />
	</Card>
	<Card title="Vtuber Count by Birthday" class="col-span-6 aspect-chart">
		<VtuberCountBirthdayChart />
	</Card>
	<Card title="Average Vtuber Height" class="col-span-6 md:col-span-3">
		<VtuberAvgHeight />
	</Card>
	<Card title="Average Vtuber Weight" class="col-span-6 md:col-span-3">
		<VtuberAvgWeight />
	</Card>
	<Card title="Vtuber Count by Language" class="col-span-6 hidden aspect-chart 2xl:block">
		<VtuberCountByLanguageChart />
	</Card>
	<Card title="Vtuber Count by Language" class="col-span-6 hidden aspect-chart md:block 2xl:hidden">
		<VtuberCountByLanguageChart limit={10} />
	</Card>
	<Card title="Vtuber Count by Language" class="col-span-6 aspect-chart md:hidden">
		<VtuberCountByLanguageChart limit={5} />
	</Card>
	<Card title="Vtuber Count by Blood Type" class="col-span-6 aspect-video md:col-span-3">
		<VtuberCountByBloodChart />
	</Card>
	<Card title="Vtuber Count by Channel Type" class="col-span-6 aspect-video md:col-span-3">
		<VtuberCountByChannelChart />
	</Card>
	<Card title="Vtuber Count by Gender" class="col-span-6 aspect-video md:col-span-3">
		<VtuberCountByGenderChart />
	</Card>
	<Card title="Vtuber Count by Zodiac" class="col-span-6 aspect-video md:col-span-3">
		<VtuberCountByZodiacChart />
	</Card>
</div>
