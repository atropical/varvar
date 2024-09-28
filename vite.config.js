import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  build: {
    root: "./src",
    target: 'esnext',
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      input: "./src/index.html",
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  plugins: [react(), viteSingleFile()],
});
