import inquirer from "inquirer";
import { git } from ".";

const answerType = async () => {
  const { reptile } = await inquirer.prompt([
    {
      type: "list",
      name: "reptile",
      message: "What is it?",
      choices: ["feat", "fix", "refactor"],
    },
  ]);
  return `${reptile}`;
};

const addChangeFiles = async (): Promise<string> => {
  const changedFiles = await (
    await git.diff(["--name-only"])
  )
    .split("\n")
    .filter(Boolean)
    .map((file) => file.split("/").at(-1));
  return `(${changedFiles.join(", ")}): `;
};
const addMessage = async () => {
  const { reptile } = await inquirer.prompt([
    {
      type: "input",
      name: "reptile",
      message: "Insert message of commit: ",
    },
  ]);
  return reptile;
};

export const doCommit = async () => {
  const messageCommit = `${await answerType()}${await addChangeFiles()}${await addMessage()}`;
  await git.commit(messageCommit);
};
