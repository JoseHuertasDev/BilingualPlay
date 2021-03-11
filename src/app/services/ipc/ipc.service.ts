import { Injectable } from '@angular/core';
import { IpcRequest } from '@Channels/interfaces/IpcRequestInterface';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipcRenderer: IpcRenderer;

  constructor() {
    this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
  }

  public send<T>(channel: string, request: IpcRequest): Promise<T> {
    // If there's no request
    if (!request.responseChannel) {
      request.responseChannel = `${channel}_response_${new Date().getTime()}`
    }

    const ipcRenderer = this.ipcRenderer;
    ipcRenderer.send(channel, request);

    // This method returns a promise which will be resolved when the response has arrived.
    return new Promise(resolve => {
      ipcRenderer.once(request.responseChannel? request.responseChannel:"", (event, response) => resolve(response));
    });

  }
}
