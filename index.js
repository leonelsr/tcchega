'use strict';
const electron = require('electron');

const app = electron.app;

/*
const remote = require('electron').remote;
remote.app.relaunch();
remote.app.exit(0);
*/

// Adds debug features like hotkeys for triggering dev tools and reload
//require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 400,
		height: 120,
		frame: false,
        transparent: true
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
