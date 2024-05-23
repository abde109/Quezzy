/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you have different file extensions
  ],
  theme: {
    extend: {
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
     

      width: {
        '120': '30rem',
        '140': '45rem',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-40px)' },
        },

        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },

      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        fadeInUp: 'fadeInUp 2.5s ease-out forwards',
      },

    },
  },
  plugins: [],
}


