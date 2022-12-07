/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        default: {
          DEFAULT: '#1976d2',
        },
        primary: {
          light: 'rgb(var(--color-primary) / .3)',
          DEFAULT: 'rgb(var(--color-primary) / 1)',
          dark: 'rgb(var(--color-primary) / .8)',
        },
        secondary: {
          light: 'rgb(var(--color-secondary) / .3)',
          DEFAULT: 'rgb(var(--color-secondary) / 1)',
          dark: 'rgb(var(--color-secondary) / .8)',
        },
      },
    },
  },
  plugins: [],
};
