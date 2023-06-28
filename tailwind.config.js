/**  @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      planet: ["PlanetKosmos", "serif"],
      genos: ["Genos", "sans-serif"],
    },
    extend: {
      colors: {
        cyan: {
          50: "#9BFCFE",
          100: "#87FBFE",
          200: "#5FFAFE",
          300: "#36F9FD",
          400: "#0EF7FD",
          500: "#02DBE0",
          600: "#02A5A8",
          700: "#016E71",
          800: "#013839",
          900: "#000202",
          950: "#000000",
        },
        purple: {
          50: "#F4C3E7",
          100: "#F1B1E0",
          200: "#EB8FD3",
          300: "#E46CC5",
          400: "#DE4AB8",
          500: "#D827AA",
          600: "#A81E85",
          700: "#79165F",
          800: "#490D3A",
          900: "#1A0514",
          950: "#020002",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("flowbite/plugin"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#9F2A2A",
          "primary-focus": "#661B26",
          "primary-selected": "#661B26",
          neutral: "#2A303C",
          "secondary-content": "#FFFDFA",
        },
      },
    ],
  },
});
