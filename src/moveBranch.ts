import inquirer from "inquirer";
import { exit } from "process";
import { git } from ".";
import { completePush } from "./completePush";
import chalk from "chalk";
import emoji from "node-emoji";
import { loader } from "./utils";
import { GitError } from "simple-git";

export const checkCanChangeBranch = async (): Promise<boolean> => {
  try {
    const { changed } = await git.diffSummary();
    return Boolean(changed);
  } catch (error){
    const errorGit = error as any as GitError;
    if(errorGit.message.includes("WARNING: Not a git repository")){
      console.log(chalk.red(`${"WARNING: Not a git repository"}\n`))
    } else {
      console.log(chalk.red(`${errorGit.message} \n`))
    }
    exit(1);
  }
};

export const moveBranch = async () => {
  if (await checkCanChangeBranch()) {
    console.log(chalk.red("You can't change branch because you have local changes\n"));

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
  const {updateBottomBar: updateBottomBarBranches} = await loader("Loading branches...");
  const { all, current } = await git.branch(["-a"]);
  const listBranch = all
    .filter((branch) => branch !== current)
    .map((branch) =>
      branch.includes("remotes") ? branch.split("/").at(-1)! : branch
    );
    
    updateBottomBarBranches("Branches loaded! \n");
    const { choice } = await inquirer.prompt([
      {
        type: "rawlist",
        name: "choice",
        message: "Choose the branch",
        choices: [...new Set(listBranch)],
      },
    ]);
    await git.checkout(choice);
    const grinning = emoji.get("grinning");
    console.log(`${chalk.green("Branch changed!")} ${grinning}` );
};
