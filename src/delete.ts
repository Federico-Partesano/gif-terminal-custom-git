import inquirer from "inquirer";
import { git } from ".";
import { colorateLog } from "./utils";



export const deleteBranches = async() => {
    try{
    const {all} = await git.branchLocal();
    await inquirer.prompt([
        {
          type: "checkbox",
          name: "selection",
          message: "Choose the branches",
          choices: [...new Set(all)],
        },
    ]);

    //   await git.deleteLocalBranches(reptile);
      colorateLog("Success", "green")

    } catch(error){
        console.log('ERROR', error)
    }

}