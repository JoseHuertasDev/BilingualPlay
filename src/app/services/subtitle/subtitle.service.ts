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
  private subtitleFile: FileModel | undefined;
  private _playerService: PlayerService;
  private _ipcService: IpcService;
  private currentSubtitle: string | undefined = undefined;

  currentSubBehavior = new BehaviorSubject(this.currentSubtitle);


  private mainSubs?: Array<DataSubtitle>;

  intervalCurrentVideo: Subscription | undefined;

  constructor(ipcService: IpcService, playerService: PlayerService) {
    this._ipcService = ipcService;
    this._playerService = playerService;

  }
  private timeoutCurrentVideo(): void{
    this.intervalCurrentVideo = interval(1500).subscribe(() => { //Updates currentTime periodically
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
    if(this.mainSubs){
      let newSubtitle = this.findSubtitleByTime(this.mainSubs, currentTime);
      this.currentSubtitle =  newSubtitle? newSubtitle.text: undefined;
      this.currentSubBehavior.next(this.currentSubtitle);
    }
  }
  playSubs(){
    this.timeoutCurrentVideo();
  }
  async setFile(subtitleFile: FileModel): Promise<void>{
    this.subtitleFile = subtitleFile;

    if(subtitleFile.route){
      let response = await this._ipcService.send< GenericResult<Array<DataSubtitle>> >
      (Constants.SUBTITLE_CHANNEL,
      {
        params: [subtitleFile.route]
      });
      if(response.errors)
        this.mainSubs = response.value;
      console.log(response.value);
     }
  }
}
