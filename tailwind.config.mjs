/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "720px",
        md: "850px",
        lg: "1020px",
        xl: "1150px",
        "2xl": "1450px",
      },
    },
    fontFamily: {
      dm_sans: ["DM Sans", "sans-serif"],
      commissioner: ["Commissioner", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      liber: ["Libre Baskerville", "serif"],
    },
    extend: {
      colors: {
        "bulk-primary": "#64748b",
      },
    },
  },
  plugins: [],
};
