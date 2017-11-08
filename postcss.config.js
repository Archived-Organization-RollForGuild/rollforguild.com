/* eslint-env node */
const easyImport = require('postcss-easy-import')
const autoprefixer = require('autoprefixer')





module.exports = {
  plugins: [
    easyImport({prefix: '_'}), // keep this first
    autoprefixer({ /* ...options */ }) // so imports are auto-prefixed too
  ]
}
