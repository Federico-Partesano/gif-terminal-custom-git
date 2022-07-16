#! /usr/bin/env node

import { stat, mkdir, writeFile } from "fs/promises";
import { exit } from "process";
import { helpMessage } from "./help";
import { hasContainSimbol, hasContainSpace } from "./regex";
import { simpleGit, CleanOptions, SimpleGit } from "simple-git";
import inquirer from "inquirer";
import { doCommit } from "./commit";
import { moveBranch } from "./moveBranch";
import { completePush } from "./completePush";

export const git: SimpleGit = simpleGit();


// var ui = new inquirer.ui.BottomBar();

//const args = process.argv.slice(2); // command line arguments start at position 2
const action: string = process.argv[2];
// let flags: string[] = process.argv.slice(3).filter(flag => /^[-][a-zA-Z]$/.test(flag));
let flags: string[] = process.argv.filter((str) => str[0] === "-");
const createMkdir: boolean = !flags.some((flag) => flag === "-i");

export const selectChoice = (action: string) => {
  switch (action) {
    case "move":
      moveBranch();
      break;
    case "commit":
      doCommit();
      break;
    case "cpush":
      completePush();
      break;
    default:
      helpMessage();
      break;
  }
};
//-----------------------------
const generateScaffolding = async () => {
  selectChoice(action);
};

generateScaffolding()
  .then
  // () => setJsons(`${process.cwd()}/${projectName}`, outDir, main)
  // () => console.log("branch watched!")
  ()
  .catch((err) => console.log(err))

  .catch((err) => console.log(err));
