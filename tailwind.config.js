/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#ec4899',
				'primary-dark': '#4f46e5',
				border: '#e5e5e5',
				'border-dark': '#525252',
				card: '#f5f5f5',
				'card-dark': '#262626'
			},
			textColor: ({ theme }) => ({
				body: theme('colors.neutral[700]'),
				'body-dark': theme('colors.neutral[200]')
			}),
			backgroundColor: ({ theme }) => ({
				body: theme('colors.white'),
				'body-dark': theme('colors.neutral[900]'),
				modal: theme('colors.white'),
				'modal-dark': theme('colors.neutral[700]')
			}),
			aspectRatio: {
				card: '2/1'
			}
		}
	},
	plugins: []
};
