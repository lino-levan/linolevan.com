import { type Config } from "tailwindcss";
import TypographyPlugin from "@tailwindcss/typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [TypographyPlugin],
} satisfies Config;
