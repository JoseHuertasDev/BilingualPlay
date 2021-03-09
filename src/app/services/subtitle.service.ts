import { Injectable } from '@angular/core';
import {IpcRequest} from '@Channels/IpcRequestInterface'
import { FileModel } from '@Models/FileModel';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private subtitleFile: FileModel | undefined;

  constructor() { }

  setFile(subtitleFile: FileModel): void{

    this.subtitleFile = subtitleFile;
  }
}
