import inquirer from "inquirer";
import { git } from ".";
import { doCommit } from "./commit";
import { loader } from "./utils";
import emoji from "node-emoji"

export const completePush = async () => {
  await doCommit(true);
   const {updateBottomBar} = await loader();
  const aries = emoji.get("aries")
   await git.push();
   updateBottomBar(`\x1b[32mSuccessfully pushed! ${aries}`)
};
