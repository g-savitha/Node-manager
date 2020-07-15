#!/usr/bin/env node

const log = console.log;
const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const program = require("caporal");

program
  .version("1.0.0")
  .argument("[filename]", "Name of the file to be executed")
  .action((args) => {
    log(args);
  });

program.parse(process.argv);
// const start = debounce(() => {
//   log("Starting the program");
// }, 100);

// // One-liner for current directory
// chokidar
//   .watch(".")
//   .on("add", start)
//   .on("change", () => log("file changed"))
//   .on("unlink", () => log("file unlinked"));
