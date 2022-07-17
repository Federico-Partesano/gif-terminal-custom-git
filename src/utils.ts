import chalk from "chalk";
import inquirer from "inquirer";
import emoji from "node-emoji";

export const getError = (error: any) => new Error(`${error}`);

let chars = ['\/', "|", "/", "⎯"];

export const loader = async (text: string = "Loading") => {
  const ui = new inquirer.ui.BottomBar();
  let stateLoader = 0;

  const interval = setInterval(() => {
    ui.updateBottomBar(`${ chalk.yellow(text)} ${chars[stateLoader]}`);
    if (stateLoader >= 3) {
      stateLoader = 0;
    } else {
      stateLoader += 1;
    }
  }, 200);

  const updateBottomBar = (text: string, color: "red" | "green" = "green") => {
    clearInterval(interval);
    ui.updateBottomBar( chalk[color](text));
  };

  return { interval, updateBottomBar };
};


export const sleep = () => new Promise((resolve, eject) => {setTimeout(() => {resolve(undefined)}, 3000)})

export const colorateText = (text: string, color: "red" | "yellow" | "green") => chalk[color](text)

export const colorateLog = (text: string, color: "red" | "yellow" | "green") => {console.log(chalk[color](text))}