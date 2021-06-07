import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/Follow.ts',
  plugins: [
    typescript(),
    serve({
      contentBase: ['dev', 'dist']
    }),
    livereload({
      watch: 'dist'
    })
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