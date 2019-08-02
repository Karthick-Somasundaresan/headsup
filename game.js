const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
var quizProvider = require('./QuizProvider')
// const axios = require('axios')
const ipc = electron.ipcRenderer

const correctButton = document.getElementById("correctBtn")
const passButton = document.getElementById("passBtn")
const finishButton = document.getElementById("fnshBtn")
var teamLabel = document.getElementById("teamname")


correctButton.addEventListener('click', function(event){

    // const modalPath = path.join('file://',__dirname, 'game.html')
    // let win = new BrowserWindow({ frame: false, alwaysOnTop: true, width: 400, height: 200})
    // win.on('close', function() { win = null })
    // win.loadURL(modalPath)
    // win.show()
    teamLabel.innerHTML = "TeamName"
})
ipc.on('teamName',function(event, name){
    console.log("Team Name:", name)
    teamLabel.innerHTML = name
})