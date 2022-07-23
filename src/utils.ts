import chalk from "chalk";
import { exec, ExecException, spawn } from "child_process";
import inquirer from "inquirer";
import { GitError } from "simple-git";

export const getError = (error: any) => new Error(`${error}`);

export const isInArray = (array: string[], item: string) =>
  array.some((itemArray) => itemArray === item);

let chars = ["/", "|", "/", "⎯"];

export const loader = async (text: string = "Loading") => {
  const ui = new inquirer.ui.BottomBar();
  let stateLoader = 0;

  const interval = setInterval(() => {
    ui.updateBottomBar(`${chalk.yellow(text)} ${chars[stateLoader]}`);
    if (stateLoader >= 3) {
      stateLoader = 0;
    } else {
      stateLoader += 1;
    }
  }, 200);

  const updateBottomBar = (text: string, color: "red" | "green" | "yellow" = "green", stopLoader: boolean = true) => {
    stopLoader && clearInterval(interval);
    ui.updateBottomBar(chalk[color](text));
  };

  return { interval, updateBottomBar };
};

export const isGitError = (error: any): error is GitError => "message" in error;

export const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 3000);
  });

export const colorateText = (text: string, color: "red" | "yellow" | "green") =>
  chalk[color](text);

export const colorateLog = (
  text: string,
  color: "red" | "yellow" | "green"
) => {
  console.log(chalk[color](text));
};

export const execAsync = (
  command: string
): Promise<{ err: ExecException | null; stout: string; sterr: string }> =>
  new Promise(async (resolve) => {
    exec(command, (err, stout, sterr) => {
      resolve({ err, stout, sterr });
    });
  });


  export const rebaseContinue = () => new Promise((resolve, reject) => {
   const processs =  spawn("git rebase --continue", {
        shell:true,
        stdio: [process.stdin, process.stdout, process.stderr]
        })
        processs.on('close', (code: number) => {
          if (code === 0) {
            colorateLog("Successfully continue", "green")
              resolve(0);
          }
          else {
              reject("ERROR continue rebase");
          }
      });
});