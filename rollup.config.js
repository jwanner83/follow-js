import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

export default [
  {
    input: "src/Follow.ts",
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    output: [
      {
        file: "dist/follow.es.min.js",
        format: "es",
        compact: true,
      },
      {
        file: "dist/follow.min.js",
        format: "iife",
        compact: true,
        name: "Follow",
      },
      {
        file: "docs/js/follow.min.js",
        format: "iife",
        compact: true,
        name: "Follow",
      },
    ],
  },
  {
    input: "dist/dts/Follow.d.ts",
    plugins: [
      dts(),
      del({ targets: ["dist/dts/Follow*", "docs/js/dts"], hook: "buildEnd" }),
    ],
    output: [
      {
        file: "dist/dts/index.d.ts",
        format: "es",
      },
    ],
  },
];
