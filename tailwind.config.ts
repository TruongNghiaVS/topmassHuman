import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      screens: {
        "max-1280": { max: "1280px" },
        xl: "1200px",
        "2xl": "1200px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        default: "#981B1E",
        colorBase: "#F37A20",
      },
      colors: {
        default: "#D14B00",
        mainstream: "#F37A20",
        defaultText: "#D14B00",
        company: "rgba(152, 27, 30, 0.1)",
        type: "rgba(128,130,241,0.1)",
        hoverJob: "rgb(255 249 249 / 70%)",
        colorBase: "#F37A20",
      },
      listStyleType: {
        circle: "circle",
        "upper-roman": "upper-roman",
      },
    },
  },
  plugins: [],
};
export default config;
