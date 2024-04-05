import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssApply from "postcss-apply";

const config = {
  plugins: [tailwindcss, autoprefixer, postcssApply],
};

export default config;
