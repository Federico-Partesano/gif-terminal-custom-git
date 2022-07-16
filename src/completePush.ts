import inquirer from "inquirer";
import { git } from ".";
import { doCommit } from "./commit";
import { loader } from "./utils";
import emoji from "node-emoji"
import { exit } from "process";

export const completePush = async () => {
  await doCommit(true);
   const {updateBottomBar} = await loader();
  const grinning = emoji.get("grinning")
   await git.push();
   updateBottomBar(`\x1b[32mSuccessfully pushed! ${grinning}`);
   console.log(" ");
   return exit(1);
  
  };
