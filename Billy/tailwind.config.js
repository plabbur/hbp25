/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
      primary: '#3498db',
      },
      fontFamily: {
          bricolage: ["Bricolage"],
          inter: ["Inter"],
      },
  },
  },
  plugins: [],
}