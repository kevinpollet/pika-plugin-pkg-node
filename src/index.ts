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
  const simpleBinEntrypointPath = join(distNodeFolderPath, "index.bin.js");
  const mainEntrypointPath = join(
    distNodeFolderPath,
    manifest.main || "index.js"
  );

  const distNodeFolderPathExists = await fs.pathExists(distNodeFolderPath);
  if (!distNodeFolderPathExists) {
    throw new MessageError(
      `"${distNodeFolderPath}" does not exist, or was not yet created in the pipeline.`
    );
  }

  const mainEntrypointPathExists = await fs.pathExists(mainEntrypointPath);
  if (!mainEntrypointPathExists) {
    throw new MessageError(
      `"${mainEntrypointPath}" is the expected node entrypoint, but it does not exist.`
    );
  }

  const simpleBinEntrypointPathExists = await fs.pathExists(
    simpleBinEntrypointPath
  );
  const binEntrypointPath = simpleBinEntrypointPathExists
    ? simpleBinEntrypointPath
    : manifest.bin;

  return fs.writeJSON(packageJSONPath, {
    name: options.name || manifest.name,
    bin: binEntrypointPath,
    main: mainEntrypointPath,
    pkg: {
      assets: options.assets || [],
    },
  });
};

export const build = ({
  options,
  out,
  reporter,
}: BuilderOptions): Promise<void> => {
  const outPath = join(out, options.outPath || "bin");
  const args = [out, "--out-path", outPath];

  if (options.targets) {
    args.push("--targets", options.targets.join(","));
  }
  return exec(args)
    .then((): Promise<string[]> => fs.readdir(outPath))
    .then((generatedFiles: string[]): void =>
      generatedFiles.forEach((generatedFile: string): void =>
        reporter.created(join(outPath, generatedFile))
      )
    );
};

export const afterJob = ({ out }: BuilderOptions): Promise<void> => {
  const packageJSONPath = join(out, "package.json");

  return fs.remove(packageJSONPath);
};
