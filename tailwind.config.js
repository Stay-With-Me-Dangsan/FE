/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        active: {
          bg: '#9470DC',
          text: '#FFFFFF',
        },
        disabled: {
          bg: '#F0F0F0',
          text: '#989898',
        },
        input: {
          text: '#989898',
        },
      },
    },
  },
  plugins: [],
};
