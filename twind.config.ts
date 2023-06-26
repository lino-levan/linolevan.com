import { defineConfig } from "twind-core";
import presetTailwind from "twind-preset-tailwind";
import presetTypography from "twind-preset-typography";
import presetAutoprefix from "twind-preset-autoprefix";

export default {
  ...defineConfig({
    presets: [presetTailwind(), presetTypography(), presetAutoprefix()],
    theme: {
      fontFamily: {
        schoolbell: ["Schoolbell", "cursive"],
      },
    },
  }),
  selfURL: import.meta.url,
};
