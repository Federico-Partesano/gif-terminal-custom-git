import inquirer from "inquirer";
import { selectChoice } from ".";

const commandsList = {
  "move: checkout to another branch": "move",
  "cpush: git add . && guided commit and push": "cpush",
  "commit: do a guided commit": "commit",
} as const;

type CommandsLabel = keyof typeof commandsList;

const commands: CommandsLabel[] = Object.keys(commandsList) as CommandsLabel[];

export const helpMessage = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "action",
      message: "Choose action",
      choices: commands,
    },
  ]);
  
  await selectChoice(commandsList[action as CommandsLabel]);
};
