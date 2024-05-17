/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you have different file extensions
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF5722',
        accent: '#FFC107',
        neutral: '#333333',
      },
    },
  },
  plugins: [],
}


