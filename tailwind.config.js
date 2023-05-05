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
          primary: "#02DBE0",
          "primary-focus": "#01b7bb",
          neutral: "#2A303C",
          "secondary-content": "#FFFDFA",
        },
      },
    ],
  },
});
