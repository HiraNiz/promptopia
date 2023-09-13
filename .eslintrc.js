module.exports = {
    env: {
      node: true,
      commonjs: true,
      browser: true,
      es6: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.js", ".eslintrc.cjs"], // Add the file extensions you're using
        parserOptions: {
          sourceType: "module",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 2021, // Specify the ECMAScript version you're using
      sourceType: "module",
    },
    plugins: [],
    rules: {
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
      },
    globals: {
      process: "readonly", // Allow the use of the process global variable
    },
  };
  