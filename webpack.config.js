const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//* 출력 파일
const outputPath = "dist";

//* entryPoints를 2개로 설정한다.
const entryPoints = {
  index: path.resolve(__dirname, "src", "index.tsx"),
  background: path.resolve(__dirname, "src", "background.ts"),
  content: path.resolve(__dirname, "src", "content.ts")
};

module.exports = {
  entry: entryPoints,
  output: {
    path: path.join(__dirname, outputPath),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  //* index.tsx에 대해서만 Html생성
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "popup.html",
      chunks: ["index"],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
  },
};
