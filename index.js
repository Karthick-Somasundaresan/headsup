const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
// const axios = require('axios')
const ipc = electron.ipcRenderer
const remote = electron.remote

const teamSubButton = document.getElementById("btnTeamName")

var teamname = document.getElementById("team_name")
teamSubButton.addEventListener('click', function(event){

    const modalPath = path.join('file://',__dirname, 'game.html')
    let win = new BrowserWindow({ alwaysOnTop: false, width: 400, height: 300,  webPreferences: {
        nodeIntegration: true
      }})
    win.on('close', function() { win = null })
    // win.webContents.openDevTools()
    win.loadURL(modalPath)
    win.show()
    console.log("sending teamname:", teamname.value)
    win.webContents.on('did-finish-load', function(){
        win.webContents.send('teamName', teamname.value)
    })
    
})

ipc.on('update-team-score', function(event, teamScoreObj){
    console.log("Received teamScoreObj:", {teamScoreObj})
    teamTable = document.getElementById("score_table")
    teamRow = teamTable.insertRow(1)
    teamCell = teamRow.insertCell(0)
    scoreCell = teamRow.insertCell(1)
    teamCell.innerHTML = teamScoreObj.name
    scoreCell.innerHTML = teamScoreObj.score
    teamTable.hidden = false
})