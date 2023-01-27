import axios from "axios";
import fs from "fs";
import path from "path";
import url from "url";
import { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var githubToken = readFileFromDisk("../scripts/ghkeys.txt");
var githubRepoArray = [];
//get all repos for an org

var parsedList = JSON.parse(readFileFromDisk("../assets/coreReposJSON.txt"));
var fetchedRepos = await fetchList(parsedList);
await getMarketData(fetchedRepos);
writeToFile(
  path.resolve(__dirname, "../assets/fetchedRepoList.txt"),
  JSON.stringify(fetchedRepos)
);

function readFileFromDisk(contentPath) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, contentPath), "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, data);
    console.log("File written successfully");
  } catch (err) {
    console.error(err);
  }
}

async function fetchList(JSONList) {
  for (let index = 0; index < JSONList.length; index++) {
    const cryptoProject = JSONList[index];
    console.log("Fetching repos for: " + cryptoProject.name);
    var repos = await getRepos(cryptoProject.url);
    if (repos) {
      githubRepoArray.push(
        await parseRepos(
          repos,
          cryptoProject.name,
          cryptoProject.geckoIdentifier
        )
      );
    }
  }
  return githubRepoArray;
}

async function parseRepos(repos, org, geckoIdentifier) {
  var jsonInfo = {};
  if (geckoIdentifier) {
    jsonInfo.geckoIdentifier = geckoIdentifier;
  }
  jsonInfo.title = org;
  jsonInfo.repositories = [];
  try {
    for (let index = 0; index < repos.length; index++) {
      const element = repos[index];
      if (element.stargazers_count >= 20 && element.archived == false) {
        jsonInfo.repositories.push(element.html_url);
      }
    }
    return jsonInfo;
  } catch (error) {
    console.log(error);
    console.log("Error parsing repos at index: " + index + "\n" + element);
  }
}

//add code to handle user accounts aswell as org accounts
async function getRepos(org) {
  // split url to get unique org name
  var org = org.split("/");
  org = org[3];
  try {
    var data = await dataRequest("organisation", org);
    return data;
  } catch (error) {
    if (error.response.status == 404) {
      try {
        var data = await dataRequest("user", org);
        return data;
      } catch (error) {
        if (error.code) {
          var output = `Error fetching data for user ${org}\nRequest code was: ${error.code}\n${error.message}`;
          console.log(output);
        }
        return;
      }
    } else {
      console.log(error);
    }
  }
}

async function dataRequest(type, org) {
  var requestURL = "";

  if (type == "organisation") {
    requestURL = `https://api.github.com/orgs/${org}/repos?per_page=100`;
  } else {
    requestURL = `https://api.github.com/users/${org}/repos?per_page=100`;
  }
  var response = await axios.get(requestURL, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  //check if there are more pages
  if (response.headers.link) {
    //get the last page number
    var lastPage = response.headers.link
      .split(",")
      .find((s) => s.includes('rel="last"'))
      .split("&page=")[1]
      .split(">")[0];
    //get all the pages
    for (var i = 2; i <= lastPage; i++) {
      var response2 = await axios.get(`${requestURL}&page=${i}`, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      response.data = response.data.concat(response2.data);
    }
  }
  return response.data;
}

async function getMarketData(fetchedRepos) {
  console.log("Fetching market data for " + fetchedRepos.length + " projects");
  var geckoNameArray = [];

  for (let index = 0; index < fetchedRepos.length; index++) {
    var element = fetchedRepos[index].title.toLowerCase();

    if (fetchedRepos[index].geckoIdentifier) {
      element = fetchedRepos[index].geckoIdentifier;
    }

    geckoNameArray.push(element);
  }


  for (let index = 0; index < geckoNameArray.length; index++) {
    
    var chunk = geckoNameArray.slice(index,index + 250);
    index = index + 250;
    var geckoNameString = chunk.join(",");

    try {
      var response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${geckoNameString}&vs_currencies=usd&include_market_cap=true`
      );
      console.log(response.data);
      var parsedResponse = Object.values(response.data);
      for (let index = 0; index < parsedResponse.length; index++) {
        const element = parsedResponse[index];
        for (let index = 0; index < fetchedRepos.length; index++) {
          const repo = fetchedRepos[index];
          fetchedRepos[index].marketData = element.usd_market_cap;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return;
}
