import { git } from "."


export const doRebase = async(branch: string) => {
// const branches = await git.show("-branch");
const response  = await git.rebase([branch]);
console.log('branches', response)

}

// git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
// git log --decorate --simplify-by-decoration --oneline   | grep -v "(HEAD"   | head -n1 | sed 's/.* (\(.*\)) .*/\1/' | sed 's/\(.*\), .*/\1/'  | sed 's/origin\///'    