/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/templates/**/*.{html,js}"],
  safelist: [
    {pattern: /bg-(blue|red)-800/},
    {pattern: /grid-cols-[1-6]/},
  ],
  theme: {
    fontFamily: {
      sans: ['verela round', 'big noodle']
    },
    extend: {},
  },
  plugins: [],
}