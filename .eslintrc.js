module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  
  plugins: ["@typescript-eslint"],
  rules: {}
}
