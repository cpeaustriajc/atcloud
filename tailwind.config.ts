import type { Config }from "tailwindcss";

const tailwindConfig =  {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default tailwindConfig;
