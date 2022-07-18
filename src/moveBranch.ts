import inquirer from "inquirer";
import { exit } from "process";
import { git } from ".";
import { doCommit } from "./commit";
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
    if(errorGit.message.includes("warning: Not a git repository")){
      console.log(chalk.red(`${"warning: Not a git repository"} \n`))
    } else {
      console.log(chalk.red(`${errorGit.message} \n`))
    }
    exit(1);
  }
};

export const moveBranch = async () => {
  if (await checkCanChangeBranch()) {
    console.log(chalk.red("You can't change branch because you have local changes \n"))
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
  const {updateBottomBar: updateBottomBarBranches} = await loader("Loading branches");
  const { all, current } = await git.branch(["-a"]);
  const listBranch = all
    .filter((branch) => branch !== current)
    .map((branch) =>
      branch.includes("remotes") ? branch.split("/").at(-1)! : branch
    );

updateBottomBarBranches("Branches loaded! \n")
  const { reptile } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "reptile",
      message: "Choose the branch",
      choices: [...new Set(listBranch)],
    },
  ]);
  await git.checkout(reptile);
  const grinning = emoji.get("grinning");
  console.log(`${chalk.green("Successfully change branch!")} ${grinning}` );
};
