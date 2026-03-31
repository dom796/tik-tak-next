import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    settings: {
      react: {
        version: "19.0.0",
      },
    },
  },
];

export default eslintConfig;
