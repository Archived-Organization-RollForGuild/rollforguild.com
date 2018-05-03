/* eslint-env node */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const glob = require('glob')
const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const tagManagerEnvironments = require('./tagmanager.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {
  ANALYZE,
  CI,
  ENABLE_HMR_POLLING,
  NODE_ENV,
  RFG_GOOGLE_MAPS_API_KEY,
  RFG_GOOGLE_TAG_MANAGER_API_KEY,
  RFG_GOOGLE_TAG_MANAGER_ENV,
  RFG_GOOGLE_TAG_MANAGER_ID,
  RFG_LOCAL_API_URL,
  RFG_WORDPRESS_API_URL,
} = process.env

const tagManagerEnvironment = tagManagerEnvironments[RFG_GOOGLE_TAG_MANAGER_ENV || 'development']

let environment = 'development'

if (CI) {
  environment = 'ci'
} else if (NODE_ENV) {
  environment = NODE_ENV
}

module.exports = {
  publicRuntimeConfig: {
    analytics: {
      googleTagManager: {
        auth: tagManagerEnvironment.auth,
        id: RFG_GOOGLE_TAG_MANAGER_ID || RFG_GOOGLE_TAG_MANAGER_API_KEY,
        envId: tagManagerEnvironment.envId,
      },
    },
    apis: {
      googleMaps: { key: RFG_GOOGLE_MAPS_API_KEY },
      rfgLocal: { url: RFG_LOCAL_API_URL || 'http://localhost:3000' },
      wordpress: { url: RFG_WORDPRESS_API_URL },
    },
    environment,
    git: {
      buildURL: process.env.CIRCLE_COMPARE_URL || process.env.CIRCLE_REPOSITORY_URL || process.env.RFG_REPOSITORY_URL,
      hash: process.env.CIRCLE_SHA1 ? process.env.CIRCLE_SHA1.slice(0, 10) : 'Development',
    },
  },

  webpack: (config, { dev }) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }))
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
  webpackDevMiddleware: config => {
    /* eslint-disable no-param-reassign */
    if (ENABLE_HMR_POLLING) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // delay before rebuilding
        ignored: /node_modules/,
      }
    }
    return config
  },
}
