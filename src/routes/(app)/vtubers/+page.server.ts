import { SHIMAKAZE_HOST } from '$env/static/private';
import type { agenciesResponse } from '../../api/agencies/+server';
import type { vtubersResponse } from '../../api/vtubers/+server';
import type { PageServerLoad } from './$types';

export type vtuberSearchResponse = {
	vtubers: vtubersResponse;
	agencies: agenciesResponse;
	characterDesigners: vtuberCharacterDesignersResponse;
	character2dModelers: vtuberCharacterDesignersResponse;
	character3dModelers: vtuberCharacterDesignersResponse;
	startDebut: vtubersResponse;
	startRetired: vtubersResponse;
};

export type vtuberCharacterDesignersResponse = {
	status: number;
	message: string;
	data: Array<string>;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const [vtubersResp, agenciesResp, characterDesignersResp, character2dResp, character3dResp, startDebutResp, startRetiredResp] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/vtubers?page=1&limit=36`),
		await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-designers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-2d-modelers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-3d-modelers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_debut_year=1&sort=debut_date&limit=1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_retired_year=1&sort=retirement_date&limit=1`)
	]);
	if (
		!vtubersResp.ok ||
		!agenciesResp.ok ||
		!characterDesignersResp.ok ||
		!character2dResp.ok ||
		!character3dResp.ok ||
		!startDebutResp.ok ||
		!startRetiredResp.ok
	)
		return;
	return {
		vtubers: await vtubersResp.json(),
		agencies: await agenciesResp.json(),
		characterDesigners: await characterDesignersResp.json(),
		character2dModelers: await character2dResp.json(),
		character3dModelers: await character3dResp.json(),
		startDebut: await startDebutResp.json(),
		startRetired: await startRetiredResp.json()
	};
}) satisfies PageServerLoad;
