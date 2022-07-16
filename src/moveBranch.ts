import inquirer from "inquirer";
import { exit } from "process";
import { git } from ".";
import { COLORS } from "./colors";
import { doCommit } from "./commit";
import { completePush } from "./completePush";

const checkCanChangeBranch = async (): Promise<boolean> => {
  const { changed } = await git.diffSummary();
  return Boolean(changed);
};

export const moveBranch = async () => {
  if (await checkCanChangeBranch()) {
    console.log(
      "\x1b[31m",
      "You can't change branch because you have local changes \n"
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
  const { all, current } = await git.branch(["-a"]);
  const listBranch = all.filter((branch) => branch !== current);

  const { reptile } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "reptile",
      message: "Choose the branch",
      choices: listBranch,
    },
  ]);
  await git.checkout(reptile);
  console.log(COLORS.GREEN, "Successfully change branch!");
};
