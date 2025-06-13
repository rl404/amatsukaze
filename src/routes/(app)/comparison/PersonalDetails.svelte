<script lang="ts">
	import { formatBirthday } from '$lib/utils/utils';
	import { Card, P } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData[] | any[] = [{}, {}, {}];
</script>

<Card class="grid max-w-full grid-cols-3 gap-4 p-4 sm:p-6">
	<h3 class="h3 col-span-3 text-center">
		<span class="border-primary-500 border-l-4 pl-2">Personal Details</span>
	</h3>
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Gender</h4>
			<P class="text-center">{vtuber.gender || '-'}</P>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Age</h4>
				<P class="text-center">{!vtuber.age ? '-' : vtuber.age.toLocaleString()}</P>
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Birthday</h4>
				<P class="text-center">{formatBirthday(vtuber.birthday)}</P>
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Height</h4>
				<P class="text-center">{!vtuber.height ? '-' : vtuber.height.toLocaleString() + ' cm'}</P>
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Weight</h4>
				<P class="text-center">{!vtuber.weight ? '-' : vtuber.weight.toLocaleString() + ' kg'}</P>
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Blood Type</h4>
				<P class="text-center">{vtuber.blood_type || '-'}</P>
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Zodiac Sign</h4>
				<P class="text-center">{vtuber.zodiac_sign || '-'}</P>
			</div>
		</div>
	{/each}
</Card>
