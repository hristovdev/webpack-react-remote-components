import { Configuration } from "webpack";
import baseConfig from "./webpack.config.base";

const prodConfig: Configuration = {
  ...baseConfig,

  mode: "production",
  optimization: {
    minimize: true,
  },
};

export default prodConfig;
