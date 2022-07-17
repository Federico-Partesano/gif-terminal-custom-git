import inquirer from "inquirer";
import { git } from ".";
import { colorateLog } from "./utils";



export const deleteBranches = async() => {
    try{
    const {all} = await git.branchLocal();
    const { reptile } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "reptile",
          message: "Choose the branches",
          choices: [...new Set(all)],
        },
      ]);

    //   await git.deleteLocalBranches(reptile);
      colorateLog("Succeff", "green")

    } catch(error){
        console.log('error', error)
    }

}