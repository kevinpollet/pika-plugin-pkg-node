/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuilderOptions } from "@pika/types";

export const beforeJob = async () => console.log("Before job");

export const afterJob = async () => console.log("After job");

export const beforeBuild = async () => console.log("Before build");

export const build = async (builderOptions: BuilderOptions) =>
  console.log(`Build ${builderOptions.cwd}`);

export const afterBuild = async () => console.log("After build");
