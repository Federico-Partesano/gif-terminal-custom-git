import inquirer from "inquirer";
import { git } from ".";
import { doCommit } from "./commit";
import { loader } from "./utils";


export const completePush = async () => {
  await doCommit(true);
   const {interval, updateBottomBar} = await loader();

   await git.push();
   updateBottomBar("\x1b[32mSuccessfully pushed!")
};
