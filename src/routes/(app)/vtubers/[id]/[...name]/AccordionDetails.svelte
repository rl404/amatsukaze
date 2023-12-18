<script lang="ts">
	import ChannelBadge from '$lib/components/badges/ChannelBadge.svelte';
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import { channelSorter, formatBirthday, getHostname, isEmptyArray } from '$lib/utils/utils';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData;
</script>

<Accordion title="Details" icon={InfoIcon} open>
	<div class="grid gap-4">
		<section class="grid grid-cols-6 gap-2">
			<Border class="col-span-6">
				<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold">Basic Details</h3>
			</Border>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Original Names</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.original_names)}
						-
					{:else}
						{#each data.original_names as name}
							<span itemprop="alternateName">{name}</span>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Nicknames</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.nicknames)}
						<span>-</span>
					{:else}
						{#each data.nicknames as name}
							<span itemprop="additionalName">{name}</span>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Debut Date</div>
				<div class="flex flex-col">
					{#if !data.debut_date}
						<span>-</span>
					{:else}
						<time itemprop="birthDate" datetime={data.debut_date.slice(0, 10)}
							>{data.debut_date.slice(0, 10)}</time
						>
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Retirement Date</div>
				<div class="flex flex-col">
					{#if !data.retirement_date}
						<span>-</span>
					{:else}
						<time itemprop="deathDate" datetime={data.retirement_date.slice(0, 10)}
							>{data.retirement_date.slice(0, 10)}</time
						>
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Character Designers</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.character_designers)}
						<span>-</span>
					{:else}
						{#each data.character_designers as name}
							<div>
								<a
									href={`/vtubers?character_designer=${name}`}
									class="clickable underline"
									itemprop="parent"
									itemscope
									itemtype="https://schema.org/Person"
								>
									<span itemprop="name">{name}</span></a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">2D Modeler</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.character_2d_modelers)}
						<span>-</span>
					{:else}
						{#each data.character_2d_modelers as name}
							<div>
								<a href={`/vtubers?character_2d_modeler=${name}`} class="clickable underline">
									{name}</a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">3D Modeler</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.character_3d_modelers)}
						<span>-</span>
					{:else}
						{#each data.character_3d_modelers as name}
							<div>
								<a href={`/vtubers?character_3d_modeler=${name}`} class="clickable underline">
									{name}</a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Agencies</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.agencies)}
						<span>-</span>
					{:else}
						{#each data.agencies as agency}
							<div>
								<a
									href={`/agencies/${agency.id}/${agency.name}`}
									class="clickable underline"
									itemprop="memberOf"
									itemscope
									itemtype="https://schema.org/Organization"
								>
									<span itemprop="name">{agency.name}</span></a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Affiliations</div>
				<div class="flex flex-col">
					{#if isEmptyArray(data.affiliations)}
						<span>-</span>
					{:else}
						{#each data.affiliations as name}
							<span itemprop="affiliation" itemscope itemtype="https://schema.org/Organization">
								<span itemprop="name">{name}</span></span
							>
						{/each}
					{/if}
				</div>
			</div>
		</section>

		<section class="grid grid-cols-6 gap-2">
			<Border class="col-span-6">
				<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold">Media</h3>
			</Border>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Channels</div>
				<div class="flex flex-col gap-2">
					{#if isEmptyArray(data.channels)}
						<span>-</span>
					{:else}
						{#each data.channels.sort(channelSorter) as channel}
							<ChannelBadge data={channel} />
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Social Medias</div>
				<div class="flex flex-col gap-1">
					{#if isEmptyArray(data.social_medias)}
						<span>-</span>
					{:else}
						{#each data.social_medias as url}
							<div itemprop="contactPoint" itemscope itemtype="https://schema.org/ContactPoint">
								<a
									href={url}
									class="clickable underline"
									target="_blank"
									rel="noreferrer"
									itemprop="url">{getHostname(url)}</a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Official Websites</div>
				<div class="flex flex-col gap-1">
					{#if isEmptyArray(data.official_websites)}
						<span>-</span>
					{:else}
						{#each data.official_websites as url}
							<div itemprop="publishingPrinciples" itemscope itemtype="https://schema.org/URL">
								<a
									href={url}
									class="clickable underline"
									target="_blank"
									rel="noreferrer"
									itemprop="url">{getHostname(url)}</a
								>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</section>

		<section class="grid grid-cols-6 gap-2">
			<Border class="col-span-6">
				<h3 class="pointer-events-none whitespace-nowrap px-4 font-bold">Personal Details</h3>
			</Border>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Gender</div>
				<div class="flex flex-col">
					{#if !data.gender}
						<span>-</span>
					{:else}
						<span itemprop="gender">{data.gender}</span>
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Age</div>
				<div>{!data.age ? '-' : data.age.toLocaleString()}</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Birthday</div>
				<div>{formatBirthday(data.birthday)}</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Height</div>
				<div class="flex flex-col">
					{#if !data.height}
						<span>-</span>
					{:else}
						<span itemprop="height" itemscope itemtype="https://schema.org/QuantitativeValue">
							<meta itemprop="value" content={data.height.toString()} />
							<meta itemprop="unitCode" content="CMT" />
							<span>{data.height.toLocaleString()} cm</span>
						</span>
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Weight</div>
				<div class="flex flex-col">
					{#if !data.weight}
						<span>-</span>
					{:else}
						<span itemprop="weight" itemscope itemtype="https://schema.org/QuantitativeValue">
							<meta itemprop="value" content={data.weight.toString()} />
							<meta itemprop="unitCode" content="KGM" />
							<span>{data.weight.toLocaleString()} kg</span>
						</span>
					{/if}
				</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Blood Type</div>
				<div>{data.blood_type || '-'}</div>
			</div>

			<div class="col-span-3 flex flex-col md:col-span-2">
				<div class="subtitle font-bold">Zodiac Sign</div>
				<div>{data.zodiac_sign || '-'}</div>
			</div>
		</section>
	</div>
</Accordion>
