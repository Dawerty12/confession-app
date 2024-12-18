import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        roman: {
          'red': '#C80027',
          'yellow': '#DAA520'
        },
        background: {
          'black': '#222222',
          'gray': '#EEEEEE'
        }
      },
    },
  },
  plugins: [],
};
export default config;
