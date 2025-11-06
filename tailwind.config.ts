import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d6ff",
          300: "#a5b8ff",
          400: "#7d91ff",
          500: "#5b6cff",
          600: "#4448ff",
          700: "#3535e6",
          800: "#2d2db8",
          900: "#2d3091",
          950: "#1a1b4d",
        },
        dark: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1a1a1a",
        },
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
        "gradient-primary": "linear-gradient(135deg, #4448ff 0%, #3535e6 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
