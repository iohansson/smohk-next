/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'modules/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#faa00f',
      },
      keyframes: {
        textEmergence: {
          '0%, 100%': {
            color: '#ffffff00',
          },
          '50%': {
            color: '#ffffffff',
          },
        },
      },
      animation: {
        textEmergence: 'textEmergence 8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mahtheme: {
          primary: '#ffbe0b',
          'primary-focus': '#ffc31f',
          secondary: '#8338ec',
          accent: '#ff006e',
          neutral: '#0b090a',
          'base-100': '#161a1d',
          'base-content': '#f5f3f4',
          info: '#3a86ff',
          warning: '#fb5607',
        },
      },
    ],
  },
};
