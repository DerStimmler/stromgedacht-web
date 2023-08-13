/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: '#0C161A',
			surface: '#182328',
			text: '#E1E8EA',
			textMuted: '#626A6E',
			warning: '#F5D470',
			warningMuted: '#867C4C',
			success: '#3DEE8F',
			successMuted: '#2B885C',
			danger: '#FA7046',
			critical: '#AB375C'
		},
		fontFamily: {
			sans: ['Plus Jakarta Sans', 'sans-serif']
		},
		extend: {}
	},
	plugins: []
};
