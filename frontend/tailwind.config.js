/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors:{
      green: '#297373',
      pink: '#732955',
      gray: '#E6E6E6',
      orange: '#E9D758',
      black: '#393937',
      iceberg: '#87BFBF',
      lightgreen: '#DFF0EB',
      white: '#fff',
      },
    fontFamily: {
      'ageobold': ['tilda-sans_bold'],
      'ageoextrabold': ['GalanoClassicAltExtraBold'],
      'ageoheavy': ['GalanoClassicAltHeavy'],
      'ageonormal': ['tilda-sans_regular'],
      'ageomedium': ['tilda-sans_medium'],
    }
  },
  plugins: [],
}
