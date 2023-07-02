/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors:{
      // // main: '#d11e48',
      // pink: '#c0576f',

   
      // black: '#470d3b','#a40b54',

      // yellow: '#a47f1a',
      // color: '#eb9064',  ,#a40b54 #f0b300 #a9da88',
      // lightmain: '#e48679',
      // main: '#7e2f56', #E9D758 darkgold: '#a47f1a',
      // gold: '#E9D758',
      // green: '#62997a',
      // pink: '#d61c59',
      // black: '#3b2e2a',
      main: '#3d5a80',
      darkmain: '#14213d',
      orange: '#ee6c4d',
      icons: '#febd84',
      white: '#fff',
      black: '#293241',
      blue: '#98c1d9' ,
      lightmain: '#c9d1d3',
      //  '#e0fbfc' ,
      bgcolor: '#eaeaea',
      bg: '#d3d3d3'
      // bg: '#f8f1e9'

      //  '#fef1e0' 
      //  ,
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
