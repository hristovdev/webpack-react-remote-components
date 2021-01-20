import { Configuration, container } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

const __DEV__ = process.env.NODE_ENV === "development";

const baseConfig = (env: { WIDGET_NAME: string }): Configuration => {
  const widgetName = env.WIDGET_NAME;

  return {
    mode: __DEV__ ? "development" : "production",
    target: "web",
    entry: Object.assign(
      {},
      {
        [widgetName]: `./src/index.tsx`,
      }
    ),
    output: {
      path: path.resolve("./dist"),
      filename: "[name].js",
      library: ["Widgets", "[name]"],
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: [
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-proposal-export-namespace-from",
                  "@babel/plugin-proposal-throw-expressions",
                  "@babel/proposal-object-rest-spread",
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
      ],
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM",
      },
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
  };
};

export default baseConfig;
