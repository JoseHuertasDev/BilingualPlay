// src-backend/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from 'fs'
import { IpcChannelInterface } from "./channels/interfaces/IpcChannelInterface";
import { SubtitleChannel } from "./channels/SubtitleChannel";

class Main {
  private mainWindow: BrowserWindow;
  private DEVELOPMENT: boolean ;

  public init(ipcChannels: IpcChannelInterface[]) {
    this.configDevelopmentMode();
    app.on('ready', ()=>{this.createWindow(this.DEVELOPMENT)});
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    this.registerIpcChannels(ipcChannels);
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => channel.listen());
  }

  private configDevelopmentMode(){
    let NODE_ENV : string = process.env.NODE_ENV.toString().trim();
    this.DEVELOPMENT = <boolean>(NODE_ENV==="development");
  }
  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow(this.DEVELOPMENT);
    }
  }


  private createWindow(development: boolean) {
    this.mainWindow = new BrowserWindow({
      icon: path.join(__dirname, "../../dist-angular/bilingual-play-angular/assets/icon.png"),
      webPreferences: {
        nodeIntegration: true, // Allows IPC and other APIs
        enableRemoteModule: true, //This allow to access .remote in the renderer process
      }
    });
    this.mainWindow.removeMenu();


    /**
     * If we are in development mode then
     * load the page in the port 4200
     * else search for the compiled files of Angular.
     */
    if (development) {
      this.mainWindow.loadURL("http://localhost:4200/");
      this.mainWindow.webContents.openDevTools();
    }
    else
      this.mainWindow.loadFile(path.join(__dirname, "../dist-angular/bilingual-play-angular/index.html"));

  }
}

(new Main()).init([
  new SubtitleChannel()
]);
