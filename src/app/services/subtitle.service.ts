import { Injectable } from '@angular/core';
import { FileModel } from '../Models/FileModel';


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
