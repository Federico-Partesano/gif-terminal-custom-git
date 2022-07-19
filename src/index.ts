#! /usr/bin/env node

import { helpMessage } from "./help";
import { simpleGit, SimpleGit } from "simple-git";
import { doCommit } from "./commit";
import { moveBranch } from "./moveBranch";
import { completePush } from "./completePush";
import { doRebase } from "./rebase";
import { deleteBranches } from "./delete";
import events from "events"

export const git: SimpleGit = simpleGit();


//const args = process.argv.slice(2); // command line arguments start at position 2
const action: string = process.argv[2];
const option: string = process.argv[3];
events.EventEmitter.defaultMaxListeners = 0


export const selectChoice = (action: string) => {
  switch (action) {
    case "move":
      moveBranch();
      break;
    case "commit":
      doCommit(true);
      break;
    case "cpush":
      completePush(true);
      break;
    case "rebase":
      doRebase(option);
      break;
    case "delete":
      deleteBranches();
    case "q" || "Q":
      break;
    default:
      helpMessage();
      break;
  }
};
//-----------------------------
const run = () => {
  selectChoice(action);
  
  /* Add error handling */
};

run();
