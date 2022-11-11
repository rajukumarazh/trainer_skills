const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        4.5: "26px",
      },
      margin: {
        4.5: "26px",
      },
      colors: {
        indigo: "#264653",
        "light-gray": "#CBCBCB",
        orange: {DEFAULT: "#E76F51", light: "#F9E2DE"},
        gray: {DEFAULT: "#F1F1F1", dark: "#CBCBCB"},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
