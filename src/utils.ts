import inquirer from "inquirer";
import emoji from "node-emoji";

export const getError = (error: any) => new Error(`${error}`);

let chars = ['\/', "|", "/", "⎯"];

export const loader = async () => {
  const ui = new inquirer.ui.BottomBar();
  let stateLoader = 0;

  const interval = setInterval(() => {
    ui.updateBottomBar(`\x1b[33mLoading ${chars[stateLoader]}`);
    if (stateLoader >= 3) {
      stateLoader = 0;
    } else {
      stateLoader += 1;
    }
  }, 200);

  const updateBottomBar = (text: string) => {
    clearInterval(interval);
    ui.updateBottomBar(text);
  };

  return { interval, updateBottomBar };
};


export const sleep = () => new Promise((resolve, eject) => {setTimeout(() => {resolve(undefined)}, 3000)})