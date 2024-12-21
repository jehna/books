import { Octokit } from "@octokit/rest";
import Main from "./main";

const octokit = new Octokit();

export default async function Home() {
  const issues = await octokit.rest.issues.listForRepo({
    owner: "jehna",
    repo: "books",
    creator: "jehna",
  });

  return <Main issues={issues.data} />;
}
