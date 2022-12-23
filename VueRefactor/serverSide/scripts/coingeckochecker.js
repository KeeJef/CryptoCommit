import axios from "axios";
import fs from "fs";
import path from "path";
import url from "url";
import { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//parse to json

var unparsedList = readFileFromDisk("../assets/coreReposJSON.txt");
var parsedList = await JSON.parse(unparsedList);
var URLData = [];
testFetch()

async function testFetch() {
  for (let index = 0; index < parsedList.length; index++) {
    var element = parsedList[index].name.toLowerCase();

    if (parsedList[index].geckoIdentifier) {
      element = parsedList[index].geckoIdentifier;
    }

    try {
      var response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${element}&vs_currencies=usd&include_market_cap=true`
      );

      if (Object.keys(response.data).length === 0) {
        URLData.push("No Data for" + element)
        console.log("Could not get stats for " + element);
        continue
      }
      console.log("got data for " + element);
      URLData.push("DATA YES"+ element);
    } catch (error) {
        if(error.response.status == 429){
            //wait 1 minute
            console.log("waiting 1 minute")
            await new Promise(r => setTimeout(r, 60000));
            index--;
            continue
        }
      console.log("Could not get stats for " + element);
      URLData.push("No Data for" + element)
    }

    //axios get request to coingecko url
  }
  console.log(URLData)
}

function readFileFromDisk(contentPath) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, contentPath), "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}
