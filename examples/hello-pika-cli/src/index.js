/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { URL } from "url";
import chalk from "chalk";

const messageFileURL = new URL("../assets/message.json", import.meta.url);
const { value } = JSON.parse(fs.readFileSync(messageFileURL.pathname));

console.log(value, chalk.blue(process.argv[2] || "Pika")); // eslint-disable-line
