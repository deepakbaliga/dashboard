const {
    app,
    BrowserWindow
} = require('electron');
const express = require('express');
const port = 3000;

//To read the secrets.json file
var fs = require('fs');
var secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


function initServer() {

    const server = express();

    console.log();


    server.use(express.static('views'));

    server.get('/', function(req, res) {
        res.sendFile('index.html');
    });


    server.listen(port, () => console.log(`Application listening on port ${port}!`));


}



function createWindow() {


    initServer();

    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden'
    })

    // and load the first page of the app.
    win.loadURL('http://localhost:' + port)


    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null

    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})





// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
