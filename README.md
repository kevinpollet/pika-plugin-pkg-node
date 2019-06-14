# pika-plugin-pkg-node

[![Build Status](https://dev.azure.com/kevinpollet/pika-plugin-pkg-node/_apis/build/status/kevinpollet.pika-plugin-pkg-node?branchName=master)](https://dev.azure.com/kevinpollet/pika-plugin-pkg-node/_build/latest?definitionId=5&branchName=master) ![GitHub](https://img.shields.io/github/license/kevinpollet/pika-plugin-pkg-node.svg?color=blue)

> A [@pika/pack][1] build plugin. Package a Node.js app into a executable that can be run even on devices without Node.js installed.

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
      ["pika-plugin-pkg-node", { /* options: see below */ } ]
    ]
  }
}
```

For more information about [@pika/pack][1] & help getting started, [check out the main project repo][1].

## Options

This plugin runs the awesome [@zeit/pkg][2] under the hood. Most of the available configuration options and CLI flags are available.

### `assets`

> Default value: `[]`

Specify the assets packaged into the final executable as raw content without modifications. Assets is a list of globs, e.g. `["assets/**/*"]`.

### `debug`

> Defaults to `false`

Log packaging process. Useful, if you have issues with some particular file not packaged into the executable.

### `name`

> Defaults to the package name

Specify the name of the generated executable. For example, if the value of `name` field is `"pika"`, the following executables will be generated:

- `pika-macos`
- `pika-linux`
- `pika-win.exe`

### `outPath`

> Default value: `"bin"`

Specify the path, relative to the `pkg` folder, where the generated executables must be created.

### `targets`

> Default value: `["linux","macos","win"]`

A target consists of 3 elements, separated by dashes, for example `node6-macos-x64` or `node4-linux-armv6`:

- nodeRange: node\${n} or latest
- platform: freebsd, linux, alpine, macos, win
- arch: x64, x86, armv6, armv7

You may omit any element (and specify just node6 for example). The omitted elements will be taken from current platform or system-wide Node.js installation (its version and arch). There is also an alias `host`, that means that all 3 elements are taken from current platform/Node.js.

## Examples

- [hello-pika-cli](./examples/hello-pika-cli): Example of a CLI packaged as an executable

## License

[MIT](./LICENSE.md) © kevinpollet

[1]: https://github.com/pikapkg/pack
[2]: https://github.com/zeit/pkg
