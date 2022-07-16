import inquirer from "inquirer";
import { git } from ".";
import { doCommit } from "./commit";
import { loader } from "./utils";
import emoji from "node-emoji";
import { exit } from "process";
import chalk from "chalk";

export const completePush = async (exitOnFinish: boolean = false) => {
  await doCommit(true);
  const { updateBottomBar } = await loader();
  const grinning = emoji.get("grinning");
  await git.push();
  updateBottomBar(`${chalk.green("Successfully pushed!")} ${grinning}`);
  console.log(" ");
  exitOnFinish && exit(1);
};
