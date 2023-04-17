/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors:{
      green: '#297373',
      pink: '#FF8552',
      gray: '#E6E6E6',
      orange: '#E9D758',
      black: '#393937',
      iceberg: '#74b3ce'
    },
    fontFamily: {
      'ageobold': ['AgeoPersonalUse-Bold'],
      'ageoextrabold': ['AgeoPersonalUse-ExtraBold'],
      'ageoheavy': ['AgeoPersonalUse-Heavy'],
      'ageonormal': ['AgeoPersonalUse'],
      'ageomedium': ['AgeoPersonalUse-Medium'],
    }
  },
  plugins: [],
}
