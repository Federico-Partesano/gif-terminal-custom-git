import { git } from ".";
import { doCommit } from "./commit";
import { isGitError, loader } from "./utils";
import emoji from "node-emoji";
import { exit } from "process";
import chalk from "chalk";

const pushNewBranch = async () => {
  try {
    const { current } = await git.branchLocal();
    await git.push("origin", current, ["--set-upstream"]);

  } catch (error) {
    console.log("ERROR", error);
    exit(1);
  }
};


export const completePush = async (exitOnFinish: boolean = false) => {
  await doCommit(true);
  const { updateBottomBar } = await loader();
  const grinning = emoji.get("grinning");
  try {
    await git.push();
    updateBottomBar(`${chalk.green("Successfully pushed!")} ${grinning}`);

  } catch (e) {
    if (isGitError(e)) {
      if (e.message.includes("git push --set-upstream origin")) {
        await pushNewBranch();
        updateBottomBar(`${chalk.green("Successfully pushed!")} ${grinning}`);
      }
    }
  }
  console.log(" ");
  exitOnFinish && exit(1);
};
