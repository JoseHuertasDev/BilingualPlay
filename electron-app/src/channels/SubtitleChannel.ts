import { ipcMain, IpcMainEvent } from "electron";
import { GenericResult } from "../helpers/GenericResult";
import { IpcChannelInterface } from "./interfaces/IpcChannelInterface";
import { IpcRequest } from "./interfaces/IpcRequestInterface";
import * as path from 'path';
import * as fs from 'fs';
import { parseSync, Cue } from 'subtitle'
import { Constants } from "../helpers/Constants";
import { DataSubtitle } from "../Classes/DataSubtitle";
import * as jschardet from 'jschardet';
import * as iconv from 'iconv-lite';

export class SubtitleChannel implements IpcChannelInterface {

  getName(): string {
    return Constants.SUBTITLE_CHANNEL;
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {

    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    let subtitlePath = request.params ? request.params[0] : undefined;
    let result = new GenericResult<Array<DataSubtitle>>();

    this.checkValidSubtitle(subtitlePath, result);

    if(result.errors.length)
      return event.sender.send(request.responseChannel,  result );

    this.getSubsFromPath(subtitlePath,result, ()=>{
      return event.sender.send(request.responseChannel, result);
    });

  }
  private transformEncoding(content:Buffer){
    let detectedEncoding = jschardet.detect(content).encoding.toLowerCase();
    return iconv.decode(content, detectedEncoding);
  }
  private getSubsFromPath(subtitlePath: string,
    result: GenericResult<Array<DataSubtitle>>,
    onFinish: CallableFunction){
    fs.readFile(subtitlePath, (err, data: Buffer) => {
      if (err) {
        result.AddError(err.message);
        return;
      }

      let parsedSubtitles: Array<DataSubtitle>= [];
      let encodedData = this.transformEncoding(data);
      parseSync(encodedData).forEach((value)=>{
        parsedSubtitles.push(<DataSubtitle>value.data.valueOf());
      });

      result.value = parsedSubtitles;
      onFinish();
    });
  }
  private checkValidSubtitle (subtitlePath:string, result: GenericResult<Array<DataSubtitle>>){

    if (!this.isValidExtension(subtitlePath)) {
      result.AddError(Constants.INVALID_EXTENSION);
    }

    if (!fs.existsSync(subtitlePath)) {
      result.AddError(Constants.FILE_DOESNT_EXISTS);
    }

  }
  private isValidExtension(route: string): boolean {
    let extension = path.extname(route).replace(".",'').toUpperCase();
    if (!extension || 0 === extension.length)
      return false; //String is empty, there's no extension

    switch (extension) {
      case "SRT":
        return true;
      case "VTT":
        return true;
      default:
        return false;
    }
  }
  listen() {
    ipcMain.on(this.getName(), (event, request) => {
      this.handle(event, request);
    });

  }
}
