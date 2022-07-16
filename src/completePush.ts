import { git } from "."
import { doCommit } from "./commit";

export const completePush = async() => {
    await git.add(".");
    await doCommit();
    await git.push()
}