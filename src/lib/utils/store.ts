import { writable } from 'svelte/store';
import type { ThemeMode } from '.';

export const theme = writable<ThemeMode>();
