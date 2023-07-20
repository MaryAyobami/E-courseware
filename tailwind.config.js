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
      darkmain: '#18263b',
      orange1: '#ee6c4d',
      orange2: '#FFA500',
      white: '#fff',
      black: '#293241',
      blue: '#8fb3d0'  ,
      lightmain: '#c9d1d3',
      bgcolor: '#fff',
      lightgreen: '#c9cba3',
      gray: '#eaeaea',
      bg: '#d3d3d3',
      red: '#803d5a',
      green: '#3d807a',
      pink: '#ffa69e'

      //  '#fef1e0' #ffa69e #f6bd60 #c9cba3 #89a4c1 '#14213d #18263b #ffcb74 #8b80c1 #ff74b9  #803d5a #80a53d #5980a5 #803d5a   //  '#e0fbfc' ,   // bg: '#f8f1e9'      // '#6b8ba4'
      //  ,#3d5080, #3d807a#8b9eb3
      // #F0F0F0 0 #3d8071 

      // #3d8085 #F5F5F5 
      // #7d9fb1
      // #82a8cc #c7d3e3 #f7cac9 #5a809e  #3d7d5a  #f6bd60',
            },
    fontFamily: {
      'ageobold': ['tilda-sans_bold'],
      'ageoextrabold': ['GalanoClassicAltExtraBold'],
      'ageoheavy': ['GalanoClassicAltHeavy'],
      'ageo': ['GalanoClassicAltRegular'],
      'ageonormal': ['tilda-sans_regular'],
      'ageomedium': ['tilda-sans_medium'],
    }
  },
  plugins: [],
}


