import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import jsx from 'acorn-jsx';
import image from '@rollup/plugin-image';
import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import replace from '@rollup/plugin-replace';

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));
const external = Object.keys(pkg.dependencies || {});
// const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/cjs/index.js",
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
            {
                file: "dist/esm/index.js",
                format: "esm",
                sourcemap: true,
                exports: "named",
                banner: "import React from 'react';"
            },
        ],
        // acornInjectPlugins: [jsx()],
        // treeshake: false,
        plugins: [
            resolve(),
            image(),
            typescript({ tsconfig: "./tsconfig.json" }),
            commonjs({ defaultIsModuleExports: false }),
            babel({
                extensions: [
                    ...DEFAULT_EXTENSIONS,
                    '.ts',
                    '.tsx'
                ],
                exclude: 'node_modules/**',
                presets: ['@babel/env', '@babel/preset-react']
            }),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('dev'),
                'Object.defineProperty(exports, "__esModule", { value: true });': '',
                delimiters: ['\n', '\n'],
            }),
        ],
        external,
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external,
    },
];