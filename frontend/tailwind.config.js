/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you have different file extensions
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DB0940',
        background: '#D9D9D9',
        input: '#EDF2F7',
        accent: '#FFC107',
        neutral: '#333333',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
        sketch: ['Cabin Sketch', 'cursive'],
      },
     
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },

      width: {
        '120': '30rem',
      },
    },
  },
  plugins: [],
}


