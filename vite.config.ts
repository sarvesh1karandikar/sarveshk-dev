/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: { target: "es2022", sourcemap: false },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/test/**/*.test.ts"],
  },
});
