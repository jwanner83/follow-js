import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/Follow.ts',
  plugins: [
    typescript()
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