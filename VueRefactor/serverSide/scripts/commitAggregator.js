import axios from "axios";
import fs, { read } from "fs";
import path from "path";
import url from "url";
import { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var githubToken = readFileFromDisk("../scripts/ghkeys.txt");
var commitRepoArray = [];
var requestCounter = 0;

var repoList = JSON.parse(readFileFromDisk("../assets/fetchedRepoList.txt"));

for (let index = 0; index < repoList.length; index++) {
  const element = repoList[index];
  console.log("fetching data for coin Name: " + element.title);
  var coinData = await fetchList(element);
  commitRepoArray.push(coinData);
}

//sort commitRepoArray by totalCommits
commitRepoArray.sort((a, b) => (a.totalCommits > b.totalCommits) ? -1 : 1)
// give each element a rank based on its position in the array
for (let index = 0; index < commitRepoArray.length; index++) {
  const element = commitRepoArray[index];
  element.rank = index + 1;
}

writeToFile(
  path.resolve(__dirname, "../assets/weeklyCoinCommitNumber.txt"),
  JSON.stringify(commitRepoArray)
);

console.log("File written successfully")

function readFileFromDisk(contentPath) {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, contentPath),
      "utf8"
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function fetchList(repoList) {
  var coinObject = {};
  var weeklyCommitSummation = Array(52).fill(0);
  var coreRepoURL = ''
  var topRepoURL = ''
  var topRepoCommits = 0

  for (let index = 0; index < repoList.repositories.length; index++) {
    try {
      const element = repoList.repositories[index];
      var splitURL = element.split("/");
      console.log(repoList.title + ": " + splitURL[4] + " " + requestCounter);
      coreRepoURL = `https://github.com/`+ splitURL[3]

      requestCounter++;
      if (requestCounter == 4500) {
        //sleep for 60 mins
        console.log("sleeping for 60 mins");
        await new Promise((r) => setTimeout(r, 3600000));
        requestCounter = 0;
      }
      //lets check to see if we are getting a 200 or 202
      var response = await axios.get(
        `https://api.github.com/repos/${splitURL[3]}/${splitURL[4]}/stats/participation`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        }
      );

      //check if we have had a repo with more total commits than the repo we are currently testing and if so, set the topRepoURL to the current repo
      var currentRepoCommits = response.data.all.reduce((a, b) => a + b, 0)

      if (topRepoCommits < currentRepoCommits) {
        topRepoCommits = currentRepoCommits
        topRepoURL = `https://github.com/${splitURL[3]}/${splitURL[4]}`
      }

      for (let index = 0; index < response.data.all.length; index++) {
        const element = response.data.all[index];
        weeklyCommitSummation[index] += element;
      }

    } catch (error) {
      console.log(error);
      console.log("error fetching data for coin Name: " + repoList.title);

      if (error.response.data.message.includes("API rate limit exceeded")) {
        console.log("sleeping for 60 mins");
        await new Promise((r) => setTimeout(r, 3600000));
        //ensure we test the same repo again if due to timeout
        index--
      }
    }

  }
  coinObject.title = repoList.title;
  coinObject.weeklyCommitSummation = weeklyCommitSummation;
  coinObject.totalRepoCount = repoList.repositories.length;
  coinObject.totalCommits = weeklyCommitSummation.reduce((a, b) => a + b, 0);
  coinObject.coreURL = coreRepoURL;
  coinObject.topRepoURL = topRepoURL;
  return coinObject;
}

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    console.error(err);
  }
}
