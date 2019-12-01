import requests
import json 
from urllib.parse import urlparse
import os 
import re

username = #Github Username here 
token = #Github API Key here


def readFileRepo():
    #Read a list of Repos defined in the CoreRepos text file in the root dir
    rawText = open("../CoreRepos.txt","r")
    repoArray = rawText.read().splitlines()
    return repoArray

def getRepos (CoreRepo):

    repoArray = []
    nameArray = {}
    counter = 0
    repoName = ''

    if '--' in CoreRepo: #Read out the --name section in the text file

        repoName = re.split("--", CoreRepo)
        repoName = repoName[1]

        CoreRepo = re.split("--", CoreRepo)
        CoreRepo = CoreRepo[0]
        CoreRepo = CoreRepo[:-1]
        
        pass
    
    CoreRepo = urlparse(CoreRepo) # if no -- name section use the URL core repo name
    CoreRepo = CoreRepo.path.split('/')
    CoreRepo = CoreRepo[1]
    print('Processing ' + CoreRepo)
        


    try:
        reposAvail = requests.get('https://api.github.com/orgs/' + CoreRepo + '/repos', auth=(username,token))
    except requests.exceptions.RequestException:  # This is the correct syntax
        exit() 
    
    if reposAvail.status_code == 404: #we need to check for non organistations using this  GET /users/:username/repos
        try:
            reposAvail = requests.get('https://api.github.com/users/' + CoreRepo + '/repos', auth=(username,token))
        except requests.exceptions.RequestException:
            exit() 
        pass


    reposAvail = json.loads(reposAvail.text) #Load out the collected response and parse to json
    while len(reposAvail) != counter:
        repoArray.append(reposAvail[counter]["name"])
        counter += 1
        pass

        nameArray[CoreRepo] = repoArray


    nameArray['URL'] = CoreRepo

    if not repoName:
        nameArray['Common Name'] = CoreRepo
        pass
    else:

        nameArray['Common Name'] = repoName
    pass
    return nameArray

masterarray =  {}

counter = 0
coreRepofiles =  readFileRepo()

try:
    os.remove('../Fullrepos.txt')
except OSError:
    pass

while len(coreRepofiles) != counter:
    fileAddtion =  getRepos(coreRepofiles[counter])
    masterarray[counter] = fileAddtion
    counter += 1 
    pass

with open('../Fullrepos.txt', 'a') as outfile:
    json.dump(masterarray, outfile)
print("Repo dump Complete")