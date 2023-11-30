const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const myWebpackPlugin = require("./my-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },

  //Loader Setting =>  module객체
  //로더는 각 파일마다 실행됨
  module: {
    rules: [
      {
        //처리할 파일의 패턴을 정규표현식을 통해 명시 -> js파일만 해당
        test: /\.css$/,
        //패턴에 해당하는 파일은 use에 명시한 함수가 실행되는 것
        //use 배열을 읽는 순서는 뒤(css-loader) -> 앞(style-loader)
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // publicPath: "./dist", -> dist폴더에 index.html을 옮겨서 안써도됨
          name: "[name].[ext]?[hash]",
          //limit이하는 url-loader가 처리, 그 이상은 file-loader가 처리
          limit: 20000,
        },
      },
    ],
  },
  //플러그인은 plugins 배열
  //플러그인은 번들파일에 대해 딱 한번 실행
  plugins: [
    // new myWebpackPlugin()
    // 결과물에 빌드 정보나 커밋 버전같은 걸 추가
    new webpack.BannerPlugin({
      banner: () => `
      Build Date: ${new Date().toLocaleString()}
      Commit Ver: ${childProcess.execSync("git rev-parse --short HEAD")}
      User: ${childProcess.execSync("git config user.name")}
      `,
    }),
    //빌드 타임에 결정된 값을 어플리이션에 전달할 때는 DefinePlugin을 사용
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    // HTML 파일을 후처리하는데 사용, dist폴더에 index.html포함
    // NODE_ENV=development npm run build -> (개발용)이 붙게됨
    new HtmlWebpackPlugin({
      template: "./index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              //빈칸제거
              collapseWhitespace: true,
              //주석제거
              removeComments: true,
            }
          : false,
    }),
    //빌드 이전 결과물을 제거하는 플러그인
    new CleanWebpackPlugin(),
    //번들된 JS코드에서 CSS를 별로 파일로 뽑아내는 플러그인, 로더설정도 같이해줘야함
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
};
