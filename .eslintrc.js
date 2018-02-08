module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "settings": {
        "ecmascript": 6,
        "jsx": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "experimentalDecoratos": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "semi": 0,
        "eol-last": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "one-var": 0,
        "no-unused-vars": 1,
        "react/prop-types": 1,
        "no-shadow": 0,
        "no-console": 0,
        "react/forbid-prop-types": 0,
        "no-use-before-define": 0,
        "max-len": 0,
        "linebreak-style":0,
        "prefer-const":0,
        "no-nested-ternary": 0,
        "react/no-array-index-key": 0,
        "guard-for-in": 0,
        "consistent-return": 0,
        "no-restricted-syntax": 0,
        "array-callback-return": 0,
        "camelcase": 0,
        "no-unneeded-ternary": 0,
        "jsx-a11y/media-has-caption": 0,
        "no-unused-expressions": 0,
    }
};