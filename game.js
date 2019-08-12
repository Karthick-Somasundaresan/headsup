const electron = require('electron')
const path = require('path')
const _ = require('lodash')
const BrowserWindow = electron.remote.BrowserWindow
var teamQuiz = require('./TeamQuiz')
// const axios = require('axios')
const remote = electron.remote
const ipc = electron.ipcRenderer

const correctButton = document.getElementById("correctBtn")
const passButton = document.getElementById("passBtn")
const finishButton = document.getElementById("fnshBtn")
const closeButton = document.getElementById("clseBtn")
var teamLabel = document.getElementById("teamname")
var answerArea = document.getElementById("answered_area")
var gameTimer

function displayAllAnsweredElements(teamName){
    var answeredElements = teamQuiz.getAllAnsweredElements(teamName)
    answerArea.innerHTML=""
    _.forEach(answeredElements, function(element){
        var htmlStr = "<p>" + element.Name + "</p>"
        answerArea.innerHTML += htmlStr
    })
}

function getNextQuizElement(currentStatus){
    var teamName = teamLabel.innerHTML
    var dispElement = document.getElementById("display_word").value
    console.log(dispElement)
    console.log("Display Element:",dispElement)
    document.getElementById("display_word").value = teamQuiz.getNextElement(teamName, dispElement, currentStatus)
    // if (!document.getElementById("display_word").value){
    //     displayAllAnsweredElements(teamName)
    // }
    //     displayAllAnsweredElements(teamName)
    updateTeamScore(teamName)
    // var quizElement = teamQuiz.getNextElement(teamName, dispElement, currentStatus)
    // updateQuizElement(quizElement)
}
function showResult() {
    var teamName = teamLabel.innerHTML
    displayAllAnsweredElements(teamName)
    passButton.hidden = true
    correctButton.hidden = true
    finishButton.hidden = true
    document.getElementById('display_word').hidden = true
    closeButton.hidden = false
}
finishButton.addEventListener('click', showResult)

closeButton.addEventListener('click', function(){
    teamName = teamLabel.innerHTML
    ipc.send('team-score', {'name': teamName, 'score':teamQuiz.getTeamScore(teamName)})
    console.log("Sending from game.js:")
    window.close()
})

passButton.addEventListener('click', function(event){

    getNextQuizElement("unanswered")
})

correctButton.addEventListener('click', function(event){
    getNextQuizElement("answered")
})

function updateTeamScore(teamName) {
    document.getElementById('teamscore').innerHTML = teamQuiz.getTeamScore(teamName)
}

function updateQuizElement(quizElement){
    var dispElement = document.getElementById("display_word")
    dispElement.value= quizElement
}

function updateGameTimer(){
    timerObj = document.getElementById('timer_area')
    var currentVal = 90
    if (timerObj.hidden !== true){
        console.log("Timer Obje:", timerObj.innerText)
        currentVal = parseInt(timerObj.innerText, 10)
        console.log("CurrentVal:", currentVal)
        currentVal -= 1
    } else {
        timerObj.hidden = false
    }
    if (currentVal === 0) {
        currentVal = "Times UP!!!"
        console.log("Clearing the timer!!!")
        clearInterval(gameTimer)
        showResult()
    }
    console.log(currentVal)
    timerObj.innerHTML = currentVal

}
function startTimer(){
    gameTimer = setInterval(updateGameTimer, 1000)
}

function startGame() {
    console.log("Creating team: ", teamLabel.innerHTML)
    var teamName = teamLabel.innerHTML
    teamQuiz.createTeam(teamName)
    var quizElement = teamQuiz.getNextElement(teamName)
    console.log("quizElement:", quizElement)
    updateQuizElement(quizElement)
    updateTeamScore(teamName)
    startTimer();
}
ipc.on('teamName',function(event, name){
    console.log("Team Name:", name)
    teamLabel.innerHTML = name
    startGame()
})