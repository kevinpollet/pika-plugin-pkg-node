/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import chalk from "chalk";

process.stdout.write(
  chalk`Hello ${process.argv[2] || "Pika"} {yellow ʢ◉ᴥ◉ʡ}\n`
);
