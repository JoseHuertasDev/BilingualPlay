import { Injectable } from '@angular/core';
import { GenericResult } from '@HelpersElectron/GenericResult';
import { FileModel } from '@Models/FileModel';
import { IpcService } from '../ipc/ipc.service';
import { Constants } from '@HelpersElectron/Constants';
import { DataSubtitle } from '@ClassesElectron/DataSubtitle';
import { PlayerService } from '../player/player.service';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private subs = new Array<Array<DataSubtitle>>();
  private texts = new Array<string | undefined>();

  private _playerService: PlayerService;
  private _ipcService: IpcService;

  currentSubBehavior = new BehaviorSubject(this.texts);

  private intervalCurrentVideo: Subscription | undefined;

  constructor(ipcService: IpcService, playerService: PlayerService) {
    this._ipcService = ipcService;
    this._playerService = playerService;

  }
  private timeoutCurrentVideo(): void{
    this.intervalCurrentVideo = interval(1000).subscribe(() => { //Updates currentTime periodically
      this.UpdateSubitleFromTime(this._playerService._currentTime);
    })
  }
  private findSubtitleByTime(subtitles: DataSubtitle[], time: number): DataSubtitle | undefined{
    return subtitles.find(data => {
      let startTime = data.start?data.start: 0;
      let endTime = data.end?data.end: 0;
      return (time >= startTime && time<endTime)
    });
  }

  private UpdateSubitleFromTime(currentTime: number){
    this.subs.forEach((subtitleElement, index) => {
      let newSubtitle = this.findSubtitleByTime(subtitleElement, currentTime);
      this.texts[index] = newSubtitle? newSubtitle.text: undefined;
    });
    this.currentSubBehavior.next(this.texts);
  }
  playSubs(){
    this.timeoutCurrentVideo();
  }
  async addSubtitle(subtitleFile: FileModel): Promise<void>{
    if(subtitleFile.route){
      let response = await this._ipcService.send< GenericResult<Array<DataSubtitle>> >
      (Constants.SUBTITLE_CHANNEL,
      {
        params: [subtitleFile.route]
      });
      if(response.value)
        this.subs.push(response.value);
      console.log(response.value);
    }
  }

}
