import { git } from ".";
import { doCommit } from "./commit";

export const completePush = async () => {
  await doCommit(true);
  await git.push();
  console.log("\x1b[32m", "Successfully pushed!");
};
