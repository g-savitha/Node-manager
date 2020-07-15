#!/usr/bin/env node

const log = console.log;
const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const program = require("caporal");
const fs = require("fs");
const { spawn } = require("child_process");
const chalk = require("chalk");

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
    //runs a program inside a program -> using child_process
    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      log(chalk.green(">>>> Starting process..."));
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 100);

    // One-liner to watch over current directory
    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
