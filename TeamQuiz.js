var quizProvider = require('./QuizProvider')
var _ = require('lodash')
var quizObj = null
var teamObj = {}

function createTeam(teamname) {
    if( _.filter(Object.keys(teamObj), teamname).length === 0){
        teamObj[teamname] = {}
        teamObj[teamname]["quizObj"] = quizProvider.getQuizObj()
        teamObj[teamname]["score"] = 0
    }
    
}


function getNextElement(teamname, element, status){
    var nextElement = undefined
    quizObj = teamObj[teamname]["quizObj"]
    console.log("quizObj:",{quizObj})
    var currentRound = 0

    if (element !== undefined && element !== null && status !== undefined && status !== null) {
        for (var genre in quizObj) {
            if(quizObj[genre]["Name"] === element){
                quizObj[genre]["status"] = status
                currentRound = quizObj[genre]["passround"]
                quizObj[genre]["passround"] += 1
                if(status === "answered") {
                    teamObj[teamname]["score"] += 1
                }
            }
        }
    }

    nextElement = _.find(quizObj, function(obj) {
        return obj.passround === currentRound && obj.status === "unanswered"
    })
    if (nextElement === undefined)
    {
        nextElement = _.find(quizObj, function(obj) {
            return obj.status === "unanswered"
        }) 
    }
    console.log({nextElement})
    // for (var genre in quizObj) {
    //     if(quizObj[genre]["status"] === "unanswered") {
    //         quizObj[genre]["status"] = "allocated"
    //         nextElement = quizObj[genre]["Name"]
    //         break;
    //     }
    // }
    return (nextElement)?nextElement.Name:""
}

function getTeamScore(teamname) {
    return teamObj[teamname]["score"]
}

function getAllTeamScore(){
    var result = {}
    for (var team in teamObj) {
        result[team] = teamObj[team]["score"]
    }
    return teamScores
}

function getAllAnsweredElements(teamname){
    return _.filter(teamObj[teamname]["quizObj"],function(obj){ 
        return obj.status === "answered"})
}

module.exports = {
    "getTeamScore": getTeamScore,
    "getAllTeamScore": getAllTeamScore,
    "getNextElement": getNextElement,
    "getAllAnsweredElements": getAllAnsweredElements,
    "createTeam": createTeam
}