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

var unparsedList = readFileFromDisk("../assets/coreRepos.txt");
var parsedList = await parseList(unparsedList);
var fetchedRepos = await fetchList(parsedList);
writeToFile(path.resolve(__dirname, "../assets/fetchedRepoList.txt"),JSON.stringify(fetchedRepos));

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

function writeToFile(path, data) {
  try {
    fs.writeFileSync(path, data);
    console.log("File written successfully");
  } catch (err) {
    console.error(err);
  }
}

async function parseList(unparsedList) {
  var orgList = unparsedList;
  //split on new line
  orgList = orgList.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
  //remove any empty elements
  orgList = orgList.filter(function (el) {
    return el != null && el != "";
  });

  var JSONList = [];
  try {
    for (let index = 0; index < orgList.length; index++) {
      const element = orgList[index];
      //split element on -- to get org name and repo name
      var elementTransform = element.split("--");
      elementTransform[0] = elementTransform[0].trim();
      //replace any new line characters
      elementTransform[1] = elementTransform[1].replace(/(\r)/gm, "");
      JSONList.push({
        coinName: elementTransform[1],
        url: elementTransform[0],
      });
    }
    return JSONList;
  } catch (error) {
    console.log(error);
  }
}

async function fetchList(JSONList) {
  for (let index = 0; index < JSONList.length; index++) {
    const cryptoProject = JSONList[index];
    console.log("Fetching repos for: " + cryptoProject.coinName);
    var repos = await getRepos(cryptoProject.url);
    if (repos) {
      githubRepoArray.push(await parseRepos(repos, cryptoProject.coinName));
    }
  }
  return githubRepoArray;
}

async function parseRepos(repos, org) {
  var jsonInfo = {};
  jsonInfo.title = org;
  jsonInfo.repositories = [];
  try {
    for (let index = 0; index < repos.length; index++) {
      const element = repos[index];
      if (element.stargazers_count >= 10 && element.archived == false) {
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
        return
      }
    } else {
      console.log(error);
    }
  }
}

async function dataRequest(type, org) {
  var requestURL = "";

  if (type == 'organisation') {
    requestURL = `https://api.github.com/orgs/${org}/repos?per_page=100`;
  }
  else{
    requestURL = `https://api.github.com/users/${org}/repos?per_page=100`;
  }
  var response = await axios.get(
    requestURL,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );
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
      var response2 = await axios.get(
        `${requestURL}&page=${i}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        }
      );
      response.data = response.data.concat(response2.data);
    }
  }
  return response.data;
}
