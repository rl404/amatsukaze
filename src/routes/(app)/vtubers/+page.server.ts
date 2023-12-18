import { SHIMAKAZE_HOST } from '$env/static/private';
import type { BaseAPIResponse } from '$lib/types';
import { handleAPIResponse } from '$lib/utils/api';
import type { AgenciesResponse } from '../../api/agencies/+server';
import type { VtubersResponse } from '../../api/vtubers/+server';
import type { PageServerLoad } from './$types';

export type VtuberSearchResponse = {
	vtubers: VtubersResponse;
	agencies: AgenciesResponse;
	characterDesigners: VtuberCharacterDesignersResponse;
	character2dModelers: VtuberCharacterDesignersResponse;
	character3dModelers: VtuberCharacterDesignersResponse;
	startDebut: VtubersResponse;
	startRetired: VtubersResponse;
};

type VtuberCharacterDesignersResponse = BaseAPIResponse & {
	data: string[];
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24
	}
};

export const load = (async () => {
	const [
		vtubersResp,
		agenciesResp,
		characterDesignersResp,
		character2dResp,
		character3dResp,
		startDebutResp,
		startRetiredResp
	] = await Promise.all([
		await fetch(`${SHIMAKAZE_HOST}/vtubers?page=1&limit=36`),
		await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-designers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-2d-modelers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers/character-3d-modelers`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_debut_year=1&sort=debut_date&limit=1`),
		await fetch(`${SHIMAKAZE_HOST}/vtubers?start_retired_year=1&sort=retirement_date&limit=1`)
	]);
	return {
		vtubers: handleAPIResponse(vtubersResp),
		agencies: handleAPIResponse(agenciesResp),
		characterDesigners: handleAPIResponse(characterDesignersResp),
		character2dModelers: handleAPIResponse(character2dResp),
		character3dModelers: handleAPIResponse(character3dResp),
		startDebut: handleAPIResponse(startDebutResp),
		startRetired: handleAPIResponse(startRetiredResp)
	};
}) satisfies PageServerLoad;
