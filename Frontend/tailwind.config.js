/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "xl-custom": "1560px", // Custom breakpoint at 100rem
      },
    },
  },
  plugins: [],
};
