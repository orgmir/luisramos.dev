module.exports = {
	purge: ['./src/**/*.js'],
	theme: {},
	variants: {
		margin: ['responsive', 'first', 'hover', 'focus'],
	},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
}
