# CryptoCommit
Counts commits across an organisation/user and gives you aggregated charts, which are more indicative of a coins actual activity,
instead just focusing on a single repository 

Cryptocommit is hosted at https://cryptocommit.org

## How it works 

To add a new coin you specify the organisation or user URL, the Common name and the coingeckoID in the coreRepoJSON.txt file.

Once the coin is added you can run the orgRepoScanner.js script, which will iterate through all the repositories under a organization/user
and add them to the fetchedRepoList.txt file

After this you can run the orgRepoScanner.js script, which will read out of the fetchedRepoList.txt file and aggregate the commits for each
organization/user. Once finished you will be left with a weeklyCoinCommitNumber.txt file, this will contain the JSON output with an aggregate weekly
commit count for each organization/user