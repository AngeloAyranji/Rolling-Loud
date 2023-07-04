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
          DEFAULT: "#9F2A2A",
          50: "#F8EBE4",
          100: "#F2D7CC",
          200: "#E5AC9C",
          300: "#D87B6C",
          400: "#CB463B",
          500: "#9F2A2A",
          600: "#83232A",
          700: "#661B26",
          800: "#4A1420",
          900: "#2E0C16",
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
