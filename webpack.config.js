const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: 'development',
  entry: {
    main: './index.tsx'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: ['./dist', './public'],
    inline: true
    // https: true,
    // host: '192.168.31.101',
    // port: 3000
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'], // 模块内载入模块的 识别根路径（绝对路径的根节点）
    alias:{
      'pages': path.resolve(__dirname, 'pages/'),
      'utils': path.resolve(__dirname, 'utils/'),
      'baseUI': path.resolve(__dirname, 'baseUI/'),
      'typings': path.resolve(__dirname, 'typings/'),
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true // 大大提升 ts 文件的编译速度 // 但损失了 type-checking 编译报错（vscode飘红不变）（更好了！）//可以安装 fork-ts-checker-webpack-plugin 弥补
          }
        }
      },
      {
        // 未来这个可以去除
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|webp|mp3|woff2)$/,
        use: 'file-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      }
    ]
  }
  // plugins: [new BundleAnalyzerPlugin()], // 分析打包各部分所占大小
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // 感觉还是用npm install 的，
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
}

module.exports = config
