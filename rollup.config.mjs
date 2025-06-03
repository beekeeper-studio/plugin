import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const input = "src/index.ts";
/** FIXME: this file must be injected from the plugin system automatically */
const inputEventForwarder = "src/eventForwarder.ts";

export default [
  // ESM build
  {
    input,
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        outDir: "dist",
      }),
    ],
    external: [],
  },
  {
    input: inputEventForwarder,
    output: {
      file: "dist/eventForwarder.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        outDir: "dist",
      }),
    ],
    external: [],
  },

  // UMD build
  {
    input,
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "BeekeeperStudioPlugin",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        outDir: "dist",
      }),
    ],
    external: [],
  },
  {
    input: inputEventForwarder,
    output: {
      file: "dist/eventForwarder.umd.js",
      format: "umd",
      name: "BeekeeperStudioEventForwarder",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        outDir: "dist",
      }),
    ],
    external: [],
  },

  // TypeScript declarations
  {
    input,
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
    external: [],
  },
];
