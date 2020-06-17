const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'follow.min.js'
  },
  mode: 'production',
  watch: true
}