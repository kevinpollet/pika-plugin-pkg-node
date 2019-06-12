/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs-extra";
import { join } from "path";
import { exec } from "pkg";
import { BuilderOptions, MessageError } from "@pika/types";

export const beforeJob = async ({
  manifest,
  options,
  out,
}: BuilderOptions): Promise<void> => {
  const packageJSONPath = join(out, "package.json");
  const distNodeFolderPath = join(out, "dist-node");
  const nodeEntrypointPath = join(distNodeFolderPath, "index.js");

  const distNodeFolderExists = await fs.pathExists(distNodeFolderPath);
  if (!distNodeFolderExists) {
    throw new MessageError(
      `"${distNodeFolderPath}" does not exist, or was not yet created in the pipeline.`
    );
  }

  const nodeEntrypointExists = await fs.pathExists(nodeEntrypointPath);
  if (!nodeEntrypointExists) {
    throw new MessageError(
      `"${nodeEntrypointPath}" is the expected node entrypoint, but it does not exist.`
    );
  }

  return fs.writeJSON(packageJSONPath, {
    name: options.name || manifest.name,
    bin: manifest.bin || join(distNodeFolderPath, "index.bin.js"),
    main: manifest.main || nodeEntrypointPath,
  });
};

export const build = ({ options, out }: BuilderOptions): Promise<void> => {
  const outPath = join(out, options.outPath || "bin");
  const args = [out, "--out-path", outPath];

  if (options.targets) {
    args.push("--targets", options.targets.join(","));
  }
  return exec(args);
};

export const afterJob = ({ out }: BuilderOptions): Promise<void> => {
  const packageJSONPath = join(out, "package.json");

  return fs.remove(packageJSONPath);
};
