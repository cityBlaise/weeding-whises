/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'bungasai':['bungasai',"system-ui"],
        'kurnia':['kurnia',"system-ui"],
        'josephsophia':['josephsophia',"system-ui"],
        'bonushearts':['bonushearts',"system-ui"],
        'facelio':['facelio',"system-ui"],
        'roboto':['roboto',"system-ui"],
        'lovely':['lovely',"system-ui"],
      }, 
      colors:{
        "green-hermine":"#42b4b1"
      }
    },
  },
  plugins: [],
}