import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'katibeh': ['Katibeh', 'sans-serif']
      },
      colors: {
        brand: {
          '100': '#FAC8D2',
          '200': '#ED8EA1',
          '300': '#E05A74',
          '400': '#D42A4B',
          '500': '#C80027',
          '600': '#B20023',
          '700': '#99001E',
          '800': '#800019',
          '900': '#660014',
          '901': '#991D3F'
        },
        success: {
          '100': '#D8E5DB',
          '200': '#ABCCB3',
          '300': '#7ABF8A',
          '400': '#4FB265',
          '500': '#28A745',
          '600': '#1B8C35',
          '700': '#107327',
          '800': '#08591B',
          '900': '#02330E'
        },
        warning: {
          '100': '#FFF1E5',
          '200': '#F5BE93',
          '300': '#F5A362',
          '400': '#F58731',
          '500': '#F56C00',
          '600': '#C25500',
          '700': '#8F3F00',
          '800': '#5C2800',
          '900': '#291200'
        },
        neutral: {
          '100': '#EDD0F5',
          '200': '#E093F5',
          '300': '#D662F5',
          '400': '#CB31F5',
          '500': '#C100F5',
          '600': '#9900C2',
          '700': '#70008F',
          '800': '#48005C',
          '900': '#200029'
        },
        blacks: {
          'background': '#1B1B1B',
          'question-background': '#1F1F1F',
          'checkbox-black': '#323232',
          'line-black': '#292929'
        },
        whites: {
          'question-background': '#F2F2F2',
          'checkbox-white': '#D9D9D9',
          'line-white': '#E7E7E7',
          'text-gray': '#494949'
        }
      }
    },
  },
  plugins: [],
};
export default config;
