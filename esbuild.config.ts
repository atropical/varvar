import * as esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/**.ts"],
    bundle: true,
    outdir: "./dist",
    // outfile: 'dist/code.js',
    target: ["es6"],
    format: "iife",
    plugins: [
      // Add any necessary plugins here
    ],
  })
  .catch(() => process.exit(1));
