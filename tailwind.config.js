/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: '#0C161A',
			surface: '#182328',
			text: '#E1E8EA',
			textMuted: '#626A6E',
			stateYellow: '#F5D470',
			stateYellowMuted: '#867C4C',
			stateGreen: '#3DEE8F',
			stateGreenMuted: '#2B885C',
			stateOrange: '#FA7046',
			stateRed: '#AB375C',
			stateUnknown: '#808080',
			black: '#000000',
			white: '#FFFFFF'
		},
		fontFamily: {
			sans: ['Plus Jakarta Sans', 'sans-serif']
		},
		extend: {}
	},
	plugins: []
};
