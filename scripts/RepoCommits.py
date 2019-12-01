import requests
import json 
from urllib.parse import urlparse
import os 
from operator import add 

username = #Github Username
token = #Github API KEY 
totalCommitCount = 0
masterarray = {}

def loadfile():
    rawJsonRepos = open("../Fullrepos.txt", "r")
    rawJsonRepos = rawJsonRepos.read()
    jsonRepos = json.loads(rawJsonRepos)
    return jsonRepos

def getWeeklyCommits(repoArrayIntake):
    counter = 0
    counter1 = 0
    firstArray = []
    agregateCommitrepo = []
    url = repoArrayIntake['URL']
    owner = repoArrayIntake['Common Name']

    while len(repoArrayIntake[url]) != counter:
        repo = repoArrayIntake[url][counter]
        try:
            weeklyCommitRepo = requests.get('https://api.github.com/repos/' + url + "/" + repo + '/stats/commit_activity', auth=(username,token))
            counter += 1
        except requests.exceptions.RequestException:  # This is the correct syntax
            exit()

        if weeklyCommitRepo.status_code != 200:
            
            continue

            
        
        weeklyCommitRepo = json.loads(weeklyCommitRepo.text)

        while len(weeklyCommitRepo) != counter1:
            
            firstArray.append(weeklyCommitRepo[counter1]['total']) #build each repo array of commits

            counter1 += 1
            pass

        counter1 = 0 

        if not agregateCommitrepo: #dont add array to other array on the first iteration, since there is one empty array

            if len(repoArrayIntake[url]) == 1:
                agregateCommitrepo = firstArray #add the just calucated repo to a running count
                totalCommitCount = sum(firstArray)
                pass
            else:
                agregateCommitrepo = firstArray
                firstArray = []
                pass
            
            continue

        agregateCommitrepo = list(map(add, firstArray, agregateCommitrepo )) #add the just calucated repo to a running count
        totalCommitCount = sum(agregateCommitrepo)
        firstArray = []

        pass
    
    
    agregateCommitrepo.insert(0,owner)
    agregateCommitrepo.insert(1,totalCommitCount)


    print('Finished Adding commits for ' + owner)
    return agregateCommitrepo

counter = 0
repoArray = loadfile()

while len(repoArray) != counter:
    
    masterarray[counter] = getWeeklyCommits(repoArray[str(counter)])

    counter += 1 
    pass

try:
    os.remove('../Fullrepos.txt')
except OSError:
    pass

with open('../coreRepoAggCommit.txt', 'w') as outfile:
    json.dump(masterarray, outfile)



    