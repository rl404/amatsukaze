import axios from 'axios';
import {
	deleteStorage,
	getAccessToken,
	getRefreshToken,
	saveAccessToken,
	saveRefreshToken
} from './auth';
import type { RefreshTokenResponse } from '../../routes/api/auth/token/refresh/+server';

export const amatsukazeAxios = axios.create();

amatsukazeAxios.interceptors.request.use(
	async (config) => {
		config && config.headers && (config.headers.authorization = `Bearer ${getAccessToken()}`);
		return config;
	},
	(error) => Promise.reject(error)
);

amatsukazeAxios.interceptors.response.use(
	(resp) => resp,
	(error) => {
		const originalRequest = error.config;
		if (originalRequest._retry || error.response.status !== 401) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		return axios
			.post(`/api/auth/token/refresh`, null, {
				headers: {
					Authorization: `Bearer ${getRefreshToken()}`
				}
			})
			.then((resp) => {
				const data: RefreshTokenResponse = resp.data;
				saveAccessToken(data.data.access_token);
				saveRefreshToken(data.data.refresh_token);
				return amatsukazeAxios(originalRequest);
			})
			.catch((err) => {
				deleteStorage();
				if (err.response && err.response.status === 401) {
					window.location.href = '/';
					return Promise.reject(error);
				}
				return Promise.reject(error);
			});
	}
);
