import { Configuration } from "webpack";
import baseConfig from "./webpack.config.base";

const devConfig: Configuration & { devServer: any } = {
  ...baseConfig,

  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    publicPath: "/",
    port: 5000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    overlay: false,
    host: "127.0.0.1",
  },
};

export default devConfig;
