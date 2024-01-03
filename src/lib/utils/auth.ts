import {
	PUBLIC_SSO_AUTH_URL,
	PUBLIC_SSO_CLIENT_ID,
	PUBLIC_SSO_REDIRECT_URI
} from '$env/static/public';
import { writable } from 'svelte/store';
import { generateRandomStr } from './utils';

const accessTokenKey = 'access-token';
const refreshTokenKey = 'refresh-token';
const userIDKey = 'user-id';
const stateKey = 'sso-state';

export const deleteStorage = () => {
	localStorage.clear();
};

export const saveAccessToken = (token: string) => {
	localStorage.setItem(accessTokenKey, JSON.stringify(token));
};

export const getAccessToken = (): string => {
	const token = localStorage.getItem(accessTokenKey);
	if (!token) return '';
	return JSON.parse(token);
};

export const saveRefreshToken = (token: string) => {
	localStorage.setItem(refreshTokenKey, JSON.stringify(token));
};

export const getRefreshToken = (): string => {
	const token = localStorage.getItem(refreshTokenKey);
	if (!token) return '';
	return JSON.parse(token);
};

const generateState = (): string => {
	const state = generateRandomStr(20);
	localStorage.setItem(stateKey, state);
	return state;
};

export const validateState = (state: string): boolean => {
	return state === localStorage.getItem(stateKey);
};

export const deleteState = () => {
	localStorage.removeItem(stateKey);
};

export const generateOauthURL = (): string => {
	const ssoURL = PUBLIC_SSO_AUTH_URL;
	const clientID = PUBLIC_SSO_CLIENT_ID;
	const redirectURI = PUBLIC_SSO_REDIRECT_URI;
	const responseType = 'code';
	const state = generateState();
	return `${ssoURL}/?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&state=${state}`;
};

export const saveUserID = (userID: number) => {
	localStorage.setItem(userIDKey, JSON.stringify(userID));
};

export const getUserID = (): number => {
	const userID = localStorage.getItem(userIDKey);
	if (!userID) return 0;
	return JSON.parse(userID);
};

export const isLogin = writable<boolean>();

export const setIsLogin = () => {
	if (getAccessToken()) {
		isLogin.set(true);
	} else {
		isLogin.set(false);
	}
};
