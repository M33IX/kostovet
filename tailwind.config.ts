import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        mist: "#f7f7f6",
      },
      boxShadow: {
        card: "0 18px 55px rgba(0, 0, 0, 0.055)",
      },
    },
  },
  plugins: [],
};

export default config;
