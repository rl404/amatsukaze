import { error } from '@sveltejs/kit';
import type { AxiosError } from 'axios';
import axios from 'axios';

export const handleAPIResponse = async (resp: Response) => {
	if (!resp) throw error(500);
	const body = await resp.json();
	if (!resp.ok) throw error(resp.status, body.message || resp.statusText);
	return body;
};

export const getAxiosError = (error: Error | AxiosError): string => {
	if (
		!axios.isAxiosError(error) ||
		!error.response ||
		!error.response.data ||
		!error.response.data.message
	) {
		return error.message;
	}
	return error.response.data.message;
};
