const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: 'development',
  entry: {
    main: './src/index.tsx'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map',
  devServer: {
    contentBase: ['./dist', './public'],
    inline: true,
    host: '10.127.54.155', // TODO: 每次需要动态更改很烦 // powershell 里输ipconfig，局域网IPV4
    port: '8080'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules'] //typescript 识别根路径（绝对路径的根节点）
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
      { // 未来这个可以去除
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { // 未来这个可以去除
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
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
  },
  // plugins: [new BundleAnalyzerPlugin()], // 分析打包各部分所占大小
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

module.exports = config
