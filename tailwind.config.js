/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{html,js,ts,vue}',
		'./components/**/*.{html,js,ts}',
		'./@components/**/*.{html,js,ts}',
		'./pages/**/*.{html,js,ts}',
		'./modules/**/*.{html,js,ts}',
	],
	theme: {
		extend: {
			colors: {
				accent: '#F3C148',
				'dark-blue': {
					DEFAULT: '#081629',
					80: '#081629cc', // 80% прозрачности
					10: 'rgba(8,22,41,0.1)',
				},
				'blue-primary': '#0A2240',
			},
			fontFamily: {
				sans: ['"Inter"', 'sans-serif'],
			},
		},
	},
	safelist: [
		// базовые Tailwind-классы, которые могут удаляться при purge
		{ pattern: /rounded-.*/ },
		{ pattern: /gap-.*/ },
		{ pattern: /border-.*/ },
		{ pattern: /bg-.*/ },
		{ pattern: /text-.*/ },
		{ pattern: /hover:.*/ },
		{ pattern: /aspect-.*/ },
		{ pattern: /p-.*/ },
		{ pattern: /m-.*/ },
		{ pattern: /translate-.*/ },
		{ pattern: /top-.*/ },
		{ pattern: /left-.*/ },
		{ pattern: /right-.*/ },
		{ pattern: /bottom-.*/ },
	],
	plugins: [],
}
