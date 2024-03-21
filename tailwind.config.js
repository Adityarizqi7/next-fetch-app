const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
          '8xs': { max: '145px' },
          '7xs': { max: '195px' },
          '6xs': { max: '240px' },
          '5xs': { max: '320px' },
          '4xs': { max: '375px' },
          '3xs': { max: '411px' },
          '2xs': { max: '480px' },
          xs: { max: '540px' },
          xxs: { max: '639px' },
      },
      aspectRatio: {
          '3/2': '3 / 2',
          '9/16': '9 / 16'
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
