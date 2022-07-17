import chalk from "chalk";
import inquirer from "inquirer";
import { exit } from "process";
import { GitError } from "simple-git";
import { git } from ".";
import { completePush } from "./completePush";
import { checkCanChangeBranch } from "./moveBranch";
import { colorateLog } from "./utils";

export const doRebase = async (branch: string) => {
  // const branches = await git.show("-branch");
  try {
    if (await checkCanChangeBranch()) {
      console.log(
        chalk.red("You can't change branch because you have local changes \n")
      );
      await git.fetch(["-a"]);
      const { reptile } = await inquirer.prompt([
        {
          type: "confirm",
          name: "reptile",
          message: "You want to a push?",
        },
      ]);
      if (!reptile) exit(1);
      await completePush();
    }
    const response = await git.rebase([branch]);
    if (response.includes("è aggiornato")) {
      colorateLog(response, "green");
      exit(1);
    }

    console.log('rebase', response)
  } catch (e) {
    const error = e as any as GitError;
    colorateLog(error.message, "red");
  }
};

// git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
// git log --decorate --simplify-by-decoration --oneline   | grep -v "(HEAD"   | head -n1 | sed 's/.* (\(.*\)) .*/\1/' | sed 's/\(.*\), .*/\1/'  | sed 's/origin\///'
