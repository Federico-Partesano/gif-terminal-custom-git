import inquirer from "inquirer";
import { selectChoice } from ".";

const commadsLabel = {
  "move: checkout to another branch": "move",
  "cpush: do a git add . && guided commit and push": "cpush",
  "commit: do a guided commit": "commit",
} as const

type KeysOfCommandsLabel = keyof typeof commadsLabel

const commands: KeysOfCommandsLabel[] = [
  "move: checkout to another branch",
  "cpush: do a git add . && guided commit and push",
  "commit: do a guided commit",
];

export const helpMessage = async () => {
  const { reptile } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "reptile",
      message: "Choose the branch",
      choices: commands,
    },
  ]);
  await selectChoice(commadsLabel[reptile as KeysOfCommandsLabel]);
};
