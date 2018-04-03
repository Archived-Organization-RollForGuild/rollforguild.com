/* eslint-env node */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const glob = require('glob')
const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { ANALYZE, ENABLE_HMR_POLLING } = process.env

module.exports = {
  webpack: (config, { dev }) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }))
    }

    if (ENABLE_HMR_POLLING) {
      /* eslint-disable no-param-reassign */
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // delay before rebuilding
      }
    }

    if (!dev) {
      config.plugins.push(new SWPrecacheWebpackPlugin({
        cacheId: 'test-lighthouse',
        filepath: path.resolve('./static/sw.js'),
        staticFileGlobs: ['static/**/*'],
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'fastest',
            urlPattern: /[.](svg|png|jpg|css)/,
          },
          {
            handler: 'networkFirst',
            urlPattern: /^http.*/,
          },
        ],
      }))

      config.plugins.push(new UglifyJsPlugin())
    }

    config.module.rules.unshift({
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      test: /\.js$/,
    })

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
            },
          },
        ],
      }
    )

    return config
  },
}
