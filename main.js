// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createMainWindow () {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createMainWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
		app.quit();
	}
})

let answerWindowOpen = false;
let answerWindow;

ipcMain.on('questionClicked', async function(event, question) {
	if (!answerWindowOpen) {
			answerWindow = new BrowserWindow({
			width: 400,
			height: 300,
			webPreferences: {
				preload: path.join(__dirname, 'answerPreload.js')
			}
		});

		await answerWindow.loadFile('answer.html');
		answerWindowOpen = true;
	}

	if (question === "colorQuestion") {
		answerWindow.webContents.send('answer', "Blue");
	} else if (question === "foodQuestion") {
		answerWindow.webContents.send('answer', "Sushi");
	} else if (question === "animalQuestion") {
		answerWindow.webContents.send('answer', "Cats & Dogs");
	}

	answerWindow.on("closed", function() {
		answerWindowOpen = false;
		answerWindow = null;
	});
});




















