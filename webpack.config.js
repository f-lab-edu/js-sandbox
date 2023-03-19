const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: {
    index: "/src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Development",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css",
      chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // style-loader, css-loader 구성
      // Sass 파일 로더 설정
      {
        test: /\.s[ac]ss/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // css-loader 소스맵 옵션 활성화
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          // sass-loader 소스맵 옵션 활성화
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // CSS Module ([filename].module.css)
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
