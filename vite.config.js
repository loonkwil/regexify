import solid from "solid-start/vite";
import staticAdapter from "solid-start-static";
import { defineConfig } from "vite";
export default defineConfig({
  base: "/regexify/",
  plugins: [
    solid({
      adapter: staticAdapter(),
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true,
  },
});
