const path = require("path");

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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          //limit이하는 url-loader가 처리, 그 이상은 file-loader가 처리
          limit: 20000,
        },
      },
    ],
  },
};
