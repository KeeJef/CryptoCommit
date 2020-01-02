# CryptoCommit
Counts commits across an organisation/user and gives you aggregated charts, which are more indicative of a coins actual activity,
instead just focusing on a single repository 

**The web part of Cryptocommit should have been created in PHP, as rendering JS graphs in browser for 100s of coins takes a significant amount of time and should be done server side only occasionally**

Cryptocommit is hosted at https://cryptocommit.org

![test](https://cryptocommit.org/Cryptocommit.PNG)

## How it works 

To add a new coin you specify the organisation or user URL and the Common name in the CoreRepo.txt file, for example 

```https://github.com/bitcoin --Bitcoin```

Common names are specified because the core repository name is not always the same as the name the coin is commonly referred to by 

Once the coin is added you can run the GithubRepoScanner.py script, which will iterate through all the repositories under a organization/user
and add them to the FullRepos.txt file

After this point you can run the RepoCommits.py script, which will read out of the FullRepos.txt file and aggregate the commits for each
organization/user. Once finished you will be left with a coreRepoAggCommit.txt file, this will contain the JSON output with an aggregate weekly
commit count for each organization/user

For illustrative purposes, I have created a small HTML/Javascript front end which requests the coreRepoAggCommit.txt from a server and renders
said data visually with the aid of Highcharts in the browser. This is not an efficent way to scale such a site, more work should be done on the server side

