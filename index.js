#!/usr/bin/env node

const log = console.log;
const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const program = require("caporal");
const fs = require("fs");

program
  .version("1.0.0")
  .argument("[filename]", "Name of the file to be executed")
  .action(async ({ filename }) => {
    const name = filename || "index.js";
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Couldn't find the file ${name}`);
    }
    const start = debounce(() => {
      log("Starting the program");
    }, 100);

    // One-liner to watch over current directory
    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
