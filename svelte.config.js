import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	compilerOptions: {
		warningFilter: (warning) =>
			!warning.code.startsWith('element_invalid_self_closing_tag') &&
			!warning.code.startsWith('reactive_declaration_non_reactive_property')
	}
};

export default config;
