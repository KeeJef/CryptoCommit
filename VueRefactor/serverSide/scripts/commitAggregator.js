import axios from "axios";
import fs from "fs";
import path from "path";
import url from "url";
import { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var githubToken = "";
var commitRepoArray = [];
var requestCounter = 0;

var repoList = JSON.parse(readFileFromDisk());

for (let index = 0; index < repoList.length; index++) {
  const element = repoList[index];
  console.log("fetching data for coin Name: " + element.title);
  var coinData = await fetchList(element);
  commitRepoArray.push(coinData);
}
writeToFile(
  path.resolve(__dirname, "../assets/weeklyCoinCommitNumber.txt"),
  JSON.stringify(commitRepoArray)
);

function readFileFromDisk() {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../assets/fetchedRepoList.txt"),
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

  for (let index = 0; index < repoList.repositories.length; index++) {
    try {
      const element = repoList.repositories[index];
      var splitURL = element.split("/");
      console.log(repoList.title + ": " + splitURL[4] + " " + requestCounter);

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
      }
    }

  }
  coinObject.title = repoList.title;
  coinObject.weeklyCommitSummation = weeklyCommitSummation;
  return coinObject;
}

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    console.error(err);
  }
}
