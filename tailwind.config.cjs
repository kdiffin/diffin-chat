/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phoneBug: "360px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
