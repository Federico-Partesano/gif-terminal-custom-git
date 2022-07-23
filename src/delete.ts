import emoji from "node-emoji";
import { exit } from "process";
import { GitError } from "simple-git";
import { git } from ".";
import { Choices } from "./typings/Enquirer/AutoComplete";
import { colorateLog, colorateText, loader } from "./utils";
const { AutoComplete } = require('enquirer');

const grinning = emoji.get("grinning");



const removeRemoteBranch = (branch: string) =>  new Promise(async(resolve, eject) => {
  try {
    await git.push(`origin`, branch.replace("remotes/origin/", ""), ["--delete"]);
    resolve(1)
  } catch (e) {
    const error = e as any as GitError;
    colorateLog(error.message, "red");
    eject(0)
  }
});

const deleteAllRemoteBranches = (remote: string[]) => new Promise(async(resolve, eject) => {
  await Promise.all(remote.map(async(branch) => await removeRemoteBranch(branch) ));
  resolve(1);
})

const deleteAllLocalBranches = (local: string[]) => new Promise(async(resolve, eject) => {
    await git.deleteLocalBranches(local, true);
    resolve(1);
})


const groupByBranches = (branches: string[]) =>{
  const {local, remote} =  branches.reduce((acc, arr) => {
  acc[arr.startsWith("remotes/origin") ? "remote" : "local"].push(arr);
  return acc;
}, {local: [], remote: []} as Record<'local' | 'remote', string[]>);
return {local: {branches: local, callback: deleteAllLocalBranches}, remote: {branches: remote, callback: deleteAllRemoteBranches}}
}

const countSelectedBranches = (branches: Choices[]) => branches.reduce((acc, {name, enabled}) => {
 if(enabled) acc[name.startsWith("remotes/origin") ? "remote" : "local"] += 1;
  return acc;
}, {local: 0, remote: 0} as Record<'local' | 'remote', number>);

export const deleteBranches = async () => {
  try {
    const { all: allBranches, current } = await git.branch();
    const filteredBranches = allBranches.filter((branch) => branch !== current && branch !== `remotes/origin/${branch}`)
    const branches = [...new Set(filteredBranches)].map((name) => ({
      name,
      message: name,
      initial: 1,
    }));
    const prompt = new AutoComplete({
      name: "selection",
      message: "Choose the branches",
      choices: branches,
      multiple: true,
      footer: (value: any) => {
        const {local, remote} = countSelectedBranches(value.choices as Choices[]);
        return  `Selected ${local} local branch and ${remote} remote branch`;
      }
    });

    const {local, remote} = groupByBranches(await prompt.run() as string[]);
    const {updateBottomBar} = await loader("Removing branches");
    await Promise.all([local, remote].filter(({branches: {length}}) => Boolean(length)).map(async({branches, callback}) => await callback(branches)));  
    updateBottomBar(`${"Removed all selected branches!"} ${grinning}`);
    exit(0);
  } catch (error) {
    console.log("ERROR", error);
  }
};
