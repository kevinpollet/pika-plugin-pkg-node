# pika-plugin-pkg-node &middot; [![Build Status](https://dev.azure.com/kevinpollet/pika-plugin-pkg-node/_apis/build/status/kevinpollet.pika-plugin-pkg-node?branchName=master)](https://dev.azure.com/kevinpollet/pika-plugin-pkg-node/_build/latest?definitionId=5&branchName=master) ![GitHub](https://img.shields.io/github/license/kevinpollet/pika-plugin-pkg-node.svg?color=blue)

> A [@pika/pack](https://github.com/pikapkg/pack) build plugin. Package a Node.js app into an executable that can be run even on devices without Node.js installed.

## Install

```shell
# npm
$ npm install pika-plugin-pkg-node --save-dev

# yarn
$ yarn add pika-plugin-pkg-node --dev
```

## Usage

```js
{
  "name": "example-package-json",
  "version": "1.0.0",
  "@pika/pack": {
    "pipeline": [
      ["@pika/plugin-standard-pkg"],
      ["@pika/plugin-build-node"],
      ["@pika/plugin-simple-bin", { "bin": "my-cli" }],
      ["pika-plugin-pkg-node", { /* options: see below */ } ]
    ]
  }
}
```

## Options

- `name`: Optional, string, defaults to the package name.
- `outPath`: Optional, string, defaults to `bin`.
- `targets`: Optional, string[], defaults to `["linux","macos","win"]`.

## License

[MIT](./LICENSE.md) © kevinpollet
