/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FAFAFA',
          todoBg: '#FFFFFF',
          text: '#494C6B',
          textCompleted: '#D1D2DA',
          border: '#E3E4F1',
          primary: '#C058F3',
          secondary: '#55DDFF',
        },
        dark: {
          background: '#171823',
          todoBg: '#25273D',
          text: '#C8CBE7',
          textCompleted: '#4D5067',
          border: '#393A4B',
          primary: '#C058F3',
          secondary: '#55DDFF',
        },
      },
    },
  },
  plugins: [],
}