import { SHIMAKAZE_HOST } from '$env/static/private';
import type { agenciesResponse } from '../../../api/agencies/+server';
import type { tierListResponse } from '../../../api/tier-lists/+server';
import type { PageServerLoad } from './$types';

export type TierList = {
	id: string;
	title: string;
	description: string;
	tiers: Tier[];
	options: TierVtuber[];
	user: TierUser;
	updatedAt: Date;
};

export type Tier = {
	id: string;
	label: string;
	description: string;
	color: string;
	size: string;
	vtubers: TierVtuber[];
};

export type TierVtuber = {
	id: number;
	name: string;
	image: string;
	description: string;
	isDndShadowItem: boolean; // For dnd.
};

type TierUser = {
	id: number;
	username: string;
};

export type tierListAgencyResponse = {
	tier: tierListResponse;
	agencies: agenciesResponse;
};

const defaultTierLists: tierListResponse = {
	status: 200,
	message: '',
	data: {
		id: '',
		title: 'Title',
		description: 'Description',
		tiers: [
			{
				label: 'S',
				description: '',
				color: 'bg-red-500 dark:bg-red-600',
				size: 'text-3xl',
				vtubers: []
			},
			{
				label: 'A',
				description: '',
				color: 'bg-orange-500 dark:bg-orange-600',
				size: 'text-3xl',
				vtubers: []
			},
			{
				label: 'B',
				description: '',
				color: 'bg-yellow-500 dark:bg-yellow-600',
				size: 'text-3xl',
				vtubers: []
			},
			{
				label: 'C',
				description: '',
				color: 'bg-green-500 dark:bg-green-600',
				size: 'text-3xl',
				vtubers: []
			},
			{
				label: 'D',
				description: '',
				color: 'bg-blue-500 dark:bg-blue-600',
				size: 'text-3xl',
				vtubers: []
			}
		],
		options: [],
		user: { id: 0, username: '' },
		updated_at: ''
	}
};

export const load = (async ({ params }) => {
	const [tierlistsResp, agenciesResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/tier-lists/${params.id.split('/')[0]}`),
		await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`)
	]);
	if (!agenciesResp.ok) return;
	if (!tierlistsResp.ok && tierlistsResp.status !== 404) return;
	return {
		tier: tierlistsResp.status === 404 ? defaultTierLists : await tierlistsResp.json(),
		agencies: await agenciesResp.json()
	};
}) satisfies PageServerLoad;
