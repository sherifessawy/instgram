module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'phone': {'max':'720px'},
      'lg': '1024px',
      'small': {'max':'400px'},
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
