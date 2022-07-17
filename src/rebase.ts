import { GitError } from "simple-git";
import { git } from "."
import { colorateLog } from "./utils";


export const doRebase = async(branch: string) => {
// const branches = await git.show("-branch");
try {
    const response  = await git.rebase([branch]);
    console.log('branches', response)

} catch(e) {
    const error = e as any as GitError;
    colorateLog(error.message, "red")
}

}

// git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
// git log --decorate --simplify-by-decoration --oneline   | grep -v "(HEAD"   | head -n1 | sed 's/.* (\(.*\)) .*/\1/' | sed 's/\(.*\), .*/\1/'  | sed 's/origin\///'    