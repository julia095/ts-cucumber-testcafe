module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json'
    },
    plugins: [
      '@typescript-eslint',
      'sort-class-members'
    ],
    extends: [
      'airbnb-typescript/base',
    ],
    rules: {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "no-await-in-loop": 0,
      "max-len": [2, 120, 4, {"ignoreUrls": true}],
      "class-methods-use-this": [0],
      "sort-class-members/sort-class-members": [2, {
        "order": [
          "[properties]", 
          "[static-properties]",
          "constructor",
          "[methods]",
        ],
        "accessorPairPositioning": "getThenSet",
      }],
      "linebreak-style": 0
    }
  };