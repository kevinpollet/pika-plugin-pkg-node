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

> This plugin runs [@zeit/pkg](https://github.com/zeit/pkg) under the hood. Most of the available configuration options and CLI flags will be available, see https://github.com/zeit/pkg#usage for more details.

#### `name`:

> `string`, defaults to the package name.

#### `outPath`

> `string`, defaults to `bin`.

Specify the path, relative to the `pkg` folder, where the generated executables must be created.

#### `targets`

> `string[]`, defaults to `["linux","macos","win"]`

A target consists of 3 elements, separated by dashes, for example `node6-macos-x64` or `node4-linux-armv6`:

- nodeRange: node\${n} or latest
- platform: freebsd, linux, alpine, macos, win
- arch: x64, x86, armv6, armv7

You may omit any element (and specify just node6 for example). The omitted elements will be taken from current platform or system-wide Node.js installation (its version and arch). There is also an alias `host`, that means that all 3 elements are taken from current platform/Node.js.

## License

[MIT](./LICENSE.md) © kevinpollet
