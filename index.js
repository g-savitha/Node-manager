#!/usr/bin/env node

const log = console.log;
const chokidar = require("chokidar");

log("I was executed");

// One-liner for current directory
chokidar
  .watch(".")
  .on("add", () => log("file added"))
  .on("change", () => log("file changed"))
  .on("unlink", () => log("file unlinked"));
