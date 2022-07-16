import { git } from "."
import { doCommit } from "./commit";

export const completePush = async() => {
    git.add(".");
    await doCommit();
    git.push()
}