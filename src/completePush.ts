import inquirer from "inquirer";
import { git } from ".";
import { doCommit } from "./commit";

export const completePush = async () => {
  await doCommit(true);
   const ui = new inquirer.ui.BottomBar();
   ui.updateBottomBar("Loading...")

   await git.push();
   ui.updateBottomBar("\x1b[32mSuccessfully pushed!")
};
