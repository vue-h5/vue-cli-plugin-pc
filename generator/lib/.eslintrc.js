// http://eslint.cn/docs/rules/
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        // https://prettier.io/docs/en/options.html
        "prettier/prettier": [
            "warn",
            {
                "tabWidth": 4,
                "singleQuote": true,
                "semi": false,
                "trailingComma": "none"
            }
        ],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
