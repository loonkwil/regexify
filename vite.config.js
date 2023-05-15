import solid from "solid-start/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    solid({
      ssr: false,
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true,
  },
});
