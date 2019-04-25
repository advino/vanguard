const { app, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({width: 1144, height: 730});
  win.setResizable(false);

  win.loadFile('index.html');

  win.on('close', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('all-windows-closed', () => {

  if(process.platform !== 'darwin' ) {
    app.quit();
  }
});

app.on('activate', () => {

  if(win == null) {
    createWindow();
  }
});
