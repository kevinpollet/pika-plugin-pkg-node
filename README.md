# pika-plugin-pkg-node

[![Build Status](https://github.com/kevinpollet/pika-plugin-pkg-node/workflows/Build/badge.svg)](https://github.com/kevinpollet/pika-plugin-pkg-node/actions)
[![GitHub](https://img.shields.io/github/license/kevinpollet/pika-plugin-pkg-node.svg?color=blue)](./LICENSE.md)

A [@pika/pack](https://github.com/pikapkg/pack) build plugin. Package a Node.js app into an executable that can be run on devices without installing Node.js. This plugin use the awesome [@zeit/pkg](https://github.com/zeit/pkg) library under the hood.

## Install

```shell
$ npm install pika-plugin-pkg-node --save-dev  # npm
$ yarn add pika-plugin-pkg-node --dev          # yarn
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

For more information about @pika/pack & help getting started, [check out the main project repo](https://github.com/pikapkg/pack).

## Options

### `assets`

> Default value: `[]`

Specify the assets packaged into the executable as raw content without modifications. The `assets` property is a list of globs, e.g. `["assets/**/*"]`.

### `debug`

> Defaults to `false`

Log packaging process. Useful, if you have issues with some particular file not packaged into the executable.

### `name`

> Defaults to the package name

Specify the name of the generated executable. For example, if the value of `name` property is `"pika"`, the following executables will be generated:

- `pika-macos`
- `pika-linux`
- `pika-win.exe`

### `outPath`

> Default value: `"bin"`

Specify the path, relative to the `pkg` folder, where the generated executables must be created.

### `scripts`

> Default value: `[]`

Specify the scripts packaged into the executable without sources. Files specified as scripts will be compiled using `v8::ScriptCompiler`. The `scripts` property is a list of globs, e.g. `["scripts/**/*"]`.

### `targets`

> Default value: `["linux","macos","win"]`

A target consists of 3 elements, separated by dashes, for example `node6-macos-x64` or `node4-linux-armv6`:

- `nodeRange`: node\${n} or latest
- `platform`: freebsd, linux, alpine, macos, win
- `arch`: x64, x86, armv6, armv7

You may omit any element (and specify just node6 for example. The omitted elements will be taken from the current platform or system-wide Node.js installation (its version and arch). There is also an alias `host`, that means that all 3 elements are taken from the current platform/Node.js.

## Examples

- [hello-pika-cli](./examples/hello-pika-cli): Example of a CLI packaged as an executable

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

Check out the [contribution guidelines](./CONTRIBUTING.md).

## License

[MIT](./LICENSE.md) © kevinpollet
