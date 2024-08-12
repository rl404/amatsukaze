import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { AgenciesResponse } from '../../api/agencies/+server';
import type { LanguagesResponse } from '../../api/languages/+server';
import type { BaseAPIResponse } from '../../api/types';
import type { PageServerLoad } from './$types';

export type VtuberSearchResponse = {
	agencies: AgenciesResponse;
	languages: LanguagesResponse;
	characterDesigners: VtuberCharacterDesignersResponse;
	character2dModelers: VtuberCharacterDesignersResponse;
	character3dModelers: VtuberCharacterDesignersResponse;
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
	const [agenciesResp, languagesResp, characterDesignersResp, character2dResp, character3dResp] =
		await Promise.all([
			await fetch(`${SHIMAKAZE_HOST}/agencies?limit=-1`),
			await fetch(`${SHIMAKAZE_HOST}/languages`),
			await fetch(`${SHIMAKAZE_HOST}/vtubers/character-designers`),
			await fetch(`${SHIMAKAZE_HOST}/vtubers/character-2d-modelers`),
			await fetch(`${SHIMAKAZE_HOST}/vtubers/character-3d-modelers`)
		]);
	return {
		agencies: await handleAPIResponse(agenciesResp),
		languages: await handleAPIResponse(languagesResp),
		characterDesigners: await handleAPIResponse(characterDesignersResp),
		character2dModelers: await handleAPIResponse(character2dResp),
		character3dModelers: await handleAPIResponse(character3dResp)
	};
}) satisfies PageServerLoad;
