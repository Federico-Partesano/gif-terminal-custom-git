import { GitError } from "simple-git";
import { git } from ".";
import { colorateLog } from "./utils";
const { Scale } = require("enquirer");

const keyAcc = {
  0: "local",
  2: "remote",
  3: "all",
} as const;


const removeRemoteBranch = (branch: string) =>  new Promise(async(resolve, eject) => {
  try {
    await git.push(`origin --delete ${branch}`);
    resolve(1)
  } catch (e) {
    const error = e as any as GitError;
    colorateLog(error.message, "red");
    eject(0)
  }
});

export const deleteBranches = async () => {
  try {
    const { all: allBranches } = await git.branch();
    const branches = [...new Set(allBranches)].map((name) => ({
      name,
      message: name,
      initial: 1,
    }));
    const prompt = new Scale({
      name: "selection",
      message: "Choose the branches",
      // @ts-ignore
      scale: [
        { name: "2", message: "only local" },
        { name: "1", message: "none" },
        { name: "3", message: "only remote" },
        { name: "4", message: "remote and local" },
      ],
      margin: [0, 0, 2, 1],
      choices: branches,
    });
    const {local, remote, all}=  Object.entries(await prompt.run() as Record<string, 0 | 1 | 2 | 3>).reduce(
      (acc, [key, value]) =>
      value === 1
      ? acc
      : { ...acc, [keyAcc[value]]: [...acc[keyAcc[value]], key] },
      { local: [], remote: [], all: [] } as Record<
      "local" | "remote" | "all",
      string[]
      >
      );


      if(local.length) {
      await git.deleteLocalBranches(local);
      colorateLog("removed all selected local branch", "green");
      }
     if(remote.length) { 
      await Promise.all(remote.map(async(branch) => await removeRemoteBranch(branch) ));
      colorateLog("removed all selected remote branch", "green");
     }

    colorateLog("Success", "green");
  } catch (error) {
    console.log("ERROR", error);
  }
};
