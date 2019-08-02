var quizProvider = require('./QuizProvider')
var _ = require('lodash')
var quizObj = null
var teamObj = {}

function createTeam(teamname) {
    if( !_.contains(Object.keys(teamObj), teamname)){
        teamObj[teamname] = {}
        teamObj[teamname]["quizObj"] = quizProvider.getQuizObj()
        teamObj[teamname]["score"] = 0
    }
    
}


function getNextElement(teamname, element, status){
    var nextElement = null
    quizObj = teamObj[teamname]["quizObj"]
    for (var genre in quizObj) {
        if(quizObj[genre]["status"] === "unanswered") {
            quizObj[genre]["status"] = "allocated"
            nextElement = quizObj[genre]["Name"]
            break;
        }
    }
    if (element !== undefined && element !== null && status !== undefined && status !== null) {
        for (var genre in quizObj) {
            if(quizObj[genre]["Name"] === element){
                quizObj[genre]["status"] = status
            }
        }

    }
    return nextElement
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