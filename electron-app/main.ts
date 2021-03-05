// src-backend/main.ts
import { app, BrowserWindow } from "electron";
import * as path from "path";
let mainWindow: Electron.BrowserWindow;
let NODE_ENV : string = process.env.NODE_ENV.toString().trim();
let DEVELOPMENT: boolean = NODE_ENV=="development";
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist-angular/bilingual-play-angular/assets/icon.png"),
        webPreferences: {
            nodeIntegration: true, // Allows IPC and other APIs
            enableRemoteModule: true, //This allow to acces .remote in the renderer process
        }
    });
    mainWindow.removeMenu();

    if(DEVELOPMENT){
      mainWindow.loadURL("http://localhost:4200/");
      mainWindow.webContents.openDevTools();
    }
    else
      mainWindow.loadFile(path.join(__dirname, "../dist-angular/bilingual-play-angular/index.html"));

});

app.on("window-all-closed", () => {app.quit()});
