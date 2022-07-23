import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";
import { exit } from "process";
import { GitError } from "simple-git";
import { git } from ".";
import { completePush } from "./completePush";
import { checkCanChangeBranch } from "./moveBranch";
import { colorateLog, execAsync, rebaseContinue } from "./utils";

export const doRebase = async (branch: string) => {
  // const branches = await git.show("-branch");
  try {
    if (await checkCanChangeBranch()) {
      colorateLog("WARNING: You can't change branch because you have local changes.\n", "red")

      await git.fetch(["-a"]);
      const { reply } = await inquirer.prompt([
        {
          type: "confirm",
          name: "reply",
          message: "Do you want to push?",
        },
      ]);
      if (!reply) exit(1);
      await completePush();
    }
    
    await git.rebase([branch]);
    colorateLog("Successfully rebased!", "green");
    exit(0);
  } catch (e) {
    const error = e as any as GitError;
       /* Internationalize */
       if (error.message.includes("è aggiornato" || error.message.includes("Your branch is up to date"))) {
        colorateLog(error.message, "green");
        exit(1);
      } else if (error.message.includes("CONFLICT")){
        while(true) {
          const { reply } = await inquirer.prompt([
            {
              type: "confirm",
              name: "reply",
              message: "There are conflicts,  you want continue?",
            },
          ]);
          if(reply){
            try {
              await rebaseContinue();
              colorateLog("Successfully rebased!", "green");
              exit(1);
            } catch(e){
              colorateLog(e as any as string ,"red");
            }
          }else {
            await git.rebase(["--abort"]);
            exit(0);
          }
  
        }
      } else {
        colorateLog(error.message, "red")
      }
  }
};


// git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
// git log --decorate --simplify-by-decoration --oneline   | grep -v "(HEAD"   | head -n1 | sed 's/.* (\(.*\)) .*/\1/' | sed 's/\(.*\), .*/\1/'  | sed 's/origin\///'
