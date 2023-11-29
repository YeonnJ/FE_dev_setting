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
        test: /\.js$/,
        //패턴에 해당하는 파일은 use에 명시한 함수가 실행되는 것
        use: [path.resolve("./my-webpack-loader.js")],
      },
    ],
  },
};
