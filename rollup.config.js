import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sveltePreprocess from 'svelte-preprocess'
import css from "rollup-plugin-css-only"
import { terser } from 'rollup-plugin-terser'
import uglify from "rollup-plugin-uglify-es"

const production = !process.env.ROLLUP_WATCH;

export default {
  perf: true,
  input: 'src/icon.svelte',
  treeshake: true,
  external: ['@iconify/iconify'],
  // preserveModules: true,
  output: [
    /*{
      dir: 'dist.es/',
      exports: 'auto',
      format: 'es',
      sourcemap: true,
      name: 'svelte-dynamic-iconify'
    },*/
    {
      dir: 'dist/',
      exports: 'auto',
      format: 'cjs',
      sourcemap: true,
      name: 'svelte-dynamic-iconify'
    }
  ],
  plugins: [
    svelte({
      compilerOptions: {

      },
      emitCss: true,
      preprocess: sveltePreprocess({
        hydratable: true,
        dev: !production,
       }),
    }),
    resolve({
      extensions: ['.svelte', '.js'],
			preferBuiltins: false,
			browser: true,
			dedupe: importee =>
				importee === "svelte" || importee.startsWith("svelte/"),
		}),
    commonjs(),
    css(),
    //{ output: 'bundle.css' }
    production && uglify(),
		production && terser(),
  ],
};