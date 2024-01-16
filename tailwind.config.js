/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./target/scala-3.3.1/calculator-fastopt/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        gentium: ['Gentium Plus', 'serif'],
        fondamento: ['Fondamento', 'serif']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
