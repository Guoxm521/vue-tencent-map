const path = require('path')
const addModuleExports = require("babel-plugin-add-module-exports")
const transformEs2015 = require("babel-plugin-transform-es2015-modules-umd")
const syntaxDynamic = require("babel-plugin-syntax-dynamic-import")

module.exports = {
  mode: 'production',
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: '../index.js',
    library: 'VueBaiduMap',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          presets: ["@babel/preset-env"]
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"]
        },
      }
    ]
  },
  plugins: [
    addModuleExports,
    transformEs2015,
    syntaxDynamic

  ]
}
