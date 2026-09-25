import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "xp.[contenthash].bundle.js",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8091,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // Providing fallbacks for jwt lib, other polyfill options can be seen here https://webpack.js.org/configuration/resolve/#resolvefallback
    fallback: {
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      os: false,
      path: false,
      punycode: false,
      process: "process/browser",
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { targets: "> 0.5%, last 2 versions, Firefox ESR, not dead" },
              ],
              ["@babel/preset-react"],
              ["@babel/preset-typescript"],
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    // new BundleAnalyzerPlugin()
  ],
}

export default config
