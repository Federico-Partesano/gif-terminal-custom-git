#! /usr/bin/env node

import { stat, mkdir, writeFile } from "fs/promises";
import { exit } from "process";
import { helpMessage } from "./help";
import { generateComponent } from "./generateComponent";
import { hasContainSimbol, hasContainSpace } from "./regex";
import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';
import inquirer from 'inquirer';

const git: SimpleGit = simpleGit();

//const args = process.argv.slice(2); // command line arguments start at position 2
let componentName = process.argv[2];
// let flags: string[] = process.argv.slice(3).filter(flag => /^[-][a-zA-Z]$/.test(flag));
let flags: string[] = process.argv.filter((str) => str[0] === "-");
const extensionStyle = `${
  flags.some((flag) => flag === "-css") ? "css" : "scss"
}`;
const extensionComponent: "tsx" | "jsx" = `${
  flags.some((flag) => flag === "-js") ? "jsx" : "tsx"
}`;

const createMkdir: boolean = !flags.some((flag) => flag === "-i");
const pathComponent =createMkdir ? `./${componentName}/${componentName}.${extensionComponent}`  :`./${componentName}.${extensionComponent}`
const pathComponentStyle =createMkdir ? `./${componentName}/${componentName}.${extensionStyle}`  :`./${componentName}.${extensionStyle}`



const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

//- Scaffolding
//-----------------------------
// const buildFlag: string | undefined = flags.find((arg => arg === '-b'));
const generateScaffolding = async () => {
  try {
    const branch = await git.branch();
    console.log(branch);
    const answer = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'reptile',
        message: 'Which is better?',
        choices: ['alligator', 'crocodile'],
      },
    ]);
    console.log('answer', answer.reptile)
        //Output Directory
        // await writeFile(`./${projectName}/${srcDir}/${main.replace(/\.(js)($|\?)/, '.ts')}`, "");
        // console.log(`Created '${main}' file in '${srcDir}'`);
      } catch (err) {
        console.log(err);
        exit(-1);
      }
};

// Running
//---------
//if the help flag is called print help and exit

generateScaffolding()
  .then(
    // () => setJsons(`${process.cwd()}/${projectName}`, outDir, main)
    // () => console.log("branch watched!")
  )
  .catch((err) => console.log(err))

  .catch((err) => console.log(err));
