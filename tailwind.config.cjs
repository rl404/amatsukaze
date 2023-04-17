/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: ({ theme }) => ({
				'purple-dot-pattern': `radial-gradient(${theme('colors.indigo[800]')} 0.5px, ${theme('colors.neutral[900]')} 0.5px)`,
				'pink-dot-pattern': `radial-gradient(${theme('colors.pink[500]')} 0.5px,  ${theme('colors.white')} 0.5px)`
			}),
			backgroundSize: {
				'purple-dot-pattern': '15px 15px',
				'pink-dot-pattern': '15px 15px'
			}
		}
	},
	plugins: []
};
