const fs = require('fs');
var _ = require('lodash')
var rawQuizDB = fs.readFileSync('./QuizDB.json')
var quizDB = JSON.parse(rawQuizDB)
console.log(Object.keys(quizDB))

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function allocateRandomElement(genre) {
    var freeElements = _.filter(quizDB[genre], function(obj){ return obj.pool === "free"})
    console.log((freeElements.length))
    var selectedElement = _.clone(freeElements[getRandomInt(freeElements.length)])
    console.log("Selected Element:", selectedElement)
    _.forEach(quizDB[genre], function(element){ 
        if(element["Name"] === selectedElement["Name"]){
            element["pool"] = "allocated"
        }
    })
    return selectedElement
}

// getRandomElement("Cities")
function getQuizObj() {
    var quizObj = {}
    for (var genre in quizDB) {
        quizObj[genre] = {}
        quizObj[genre] = allocateRandomElement(genre)
        quizObj[genre]["status"] = "unanswered"
        quizObj[genre]["passround"] = 0
    }
    return quizObj
}

function updateQuizPool(quizObj) {
    for (var genre in quizObj) {
            _.forEach(quizDB[genre], function(element){
                if(element["Name"] === quizObj[genre]["Name"]){
                    if(quizObj[genre]["status"] === "answered"){
                        console.log("Updating to used")
                        element["pool"] = "used"
                    } else {
                        element["pool"] = "free"
                    }
                }
            })
    }
}



//Test functions
// var quizObj = getQuizObj()
// console.log("Quiz Obj:", quizObj)
// console.log("selected Cities:", quizObj["Cities"] )
// quizObj["Cities"]["status"] = "answered"
// console.log("Quiz Obj:", quizObj)
// updateQuizPool(quizObj)
// console.log(quizDB["Cities"])

module.exports = {"getQuizObj": getQuizObj, "updateQuizPool": updateQuizPool}