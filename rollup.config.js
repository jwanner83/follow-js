import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/Follow.ts',
  plugins: [
    typescript(),
    terser()
  ],
  output: [
    {
      file: 'dist/follow.es.min.js',
      format: 'es',
      compact: true
    },
    {
      file: 'dist/follow.min.js',
      format: 'iife',
      compact: true,
      name: 'Follow'
    }
  ]
}