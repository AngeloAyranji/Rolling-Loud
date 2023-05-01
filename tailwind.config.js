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
    },
    extend: {},
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
