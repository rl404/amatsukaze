/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	plugins: [require('flowbite/plugin')],
	darkMode: 'class',
	theme: {
		extend: {
			colors: ({ colors }) => ({
				gray: colors.neutral,
				primary: {
					50: 'rgb(var(--primary-50) / var(--tw-bg-opacity))',
					100: 'rgb(var(--primary-100) / var(--tw-bg-opacity))',
					200: 'rgb(var(--primary-200) / var(--tw-bg-opacity))',
					300: 'rgb(var(--primary-300) / var(--tw-bg-opacity))',
					400: 'rgb(var(--primary-400) / var(--tw-bg-opacity))',
					500: 'rgb(var(--primary-500) / var(--tw-bg-opacity))',
					600: 'rgb(var(--primary-600) / var(--tw-bg-opacity))',
					700: 'rgb(var(--primary-700) / var(--tw-bg-opacity))',
					800: 'rgb(var(--primary-800) / var(--tw-bg-opacity))',
					900: 'rgb(var(--primary-900) / var(--tw-bg-opacity))',
					950: 'rgb(var(--primary-950) / var(--tw-bg-opacity))'
				},
				border: 'rgb(var(--border) / var(--tw-border-opacity))'
			}),
			textColor: {
				primary: 'rgb(var(--primary) / var(--tw-text-opacity))'
			},
			gridTemplateColumns: {
				24: 'repeat(24, minmax(0, 1fr))'
			},
			gridColumn: {
				'span-24': 'span 24 / span 24'
			},
			aspectRatio: {
				card: '2/1',
				portrait: '4/5',
				chart: '3/1'
			}
		}
	}
};
