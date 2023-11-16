/**
 * ? webpack.config.js
 * * 본 설정 파일에는 총 세가지 주요 기능을 포함한다.
 * * ctrl + F를 통해 아래의 정보를 따로 확인하시기 바랍니다.
 * * 1. isProduction
 * * - 여기서 설명하는 process.env.NODE_ENV 는 Node.js 에서 제공하는 환경변수이다.
 * * - == 동등연산자를 사용하는 것이 마음에 들지 않지만, 검증된 설정 파일 자동으로 셋팅한 것이므로 확인만 한다.
 * * 2. config 객체
 * * 3. module.export
 * 
 * * 1, 2, 3번을 따로 확인 하면 보다 수월하게 이해할 수 있을 것
 * * 해당 파일은 webpack SW가 읽어들이는 용도이기 때문에, 프로젝트 코드와는 전혀관계가 없다.
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.Node_ENV == "production";

const config = {
  // * entry, output 필드는 webpack의 핵심이다.
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  // * plugins 필드는 webpack의 확장 기능이다. (플러그인)
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  // * module 필드는 webpack의 확장 기능이다. (로더)
  /**
   * * Loader(로더), loading 개념이 매우 중요한데, webpack은 기본적으로 JavaScript 및 JSON 파일만 이해한다.
   * * 따라서, webpack은 CSS, 이미지, 폰트와 같은 비 JavaScript 파일을 처리할 수 없다.
   * * 이러한 문제를 해결하기 위해 webpack은 로더(loader)를 사용한다.
   * * 로더는 webpack이 JavaScript 파일이 아닌 모든 유형의 파일을 처리할 수 있도록 도와준다.
   * * 로더는 webpack.config.js 파일의 module.rules 필드에 정의된다.
   * 
   * * 난이도 높은 설명: module.rules는 로더를 정의하는 배열이다.
   * * 난이도 높은 설명: 각 로더는 테스트(test), 사용(use), include,exclude 및 기타 속성을 가진 객체이다.
   * * 난이도 높은 설명: 테스트는 로더가 처리할 파일을 지정하는 정규식이다.
   * * 난이도 높은 설명: 사용은 로더가 처리할 파일에 대한 경로를 지정하는 문자열이다.
   * * 난이도 높은 설명: include는 로더가 처리할 파일에 대한 경로를 지정하는 문자열이다.
   * * 난이도 높은 설명: exclude는 로더가 처리하지 않을 파일에 대한 경로를 지정하는 문자열이다.
   * 
   * * 기타 속성은 로더가 처리할 파일에 대한 경로를 지정하는 문자열이다.
   * * 로더는 오른쪽에서 실행된다. ★(매우 중요한 개념)
   * * 배열의 마지막순부터 읽어 들인다.
   */
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  }
};

module.exports = () => {
  // * 아래는 config 객체의 mode 필드를 동적으로 할당하는 코드이다.
  // * config 객체에 mode key가 추가된채 내보내진다.

  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
}