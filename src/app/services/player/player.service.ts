
import { Injectable } from '@angular/core';

import {BehaviorSubject, interval, Subscription} from 'rxjs';
import { FileModel } from '@Models/FileModel';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private webChimera = (<any>window).require("webchimera.js")
  private player: any; // WebChimera TO-DO a TypeScript object well documented
  _currentTime: number = 0;
  private _videoDuration: number = 0;
  private currentVideo: FileModel | undefined;

  //Observables
  videoDuration : BehaviorSubject<number> = new BehaviorSubject(0);
  currentTime: BehaviorSubject<number> = new BehaviorSubject(0);

  intervalCurrentVideo: Subscription | undefined;

  constructor() { }

  private timeoutCurrentVideo(): void{ //Every 50ms updates the current time
    this.intervalCurrentVideo = interval(50).subscribe(() => { //Updates currentTime periodically
      this._currentTime = this.player.time;
      this.currentTime.next(this._currentTime);
    })
  }

  playVideo(): void{
    //Set the current video
    this.player = this.webChimera.createPlayer();

    if(this.currentVideo){
      if(this.currentVideo.route)
      this.player.play(this.routeToFile(this.currentVideo.route));

      this.player.onPlaying= ()=>{
        this._videoDuration = this.player.playlist.items[0].duration -10;
        this.videoDuration.next(this._videoDuration); // Notify the current video duration
        this.player.subtitles.track = 0;  // Disable subti0tles of VLC
        this.timeoutCurrentVideo();
        this.player.audio.track = 1; //Set to the first audio track
      };
    }
  }
  toggleMute() {
    this.player.toggleMute();
  }
  togglePause() {
    if(this.player.state==6){ // If its stoped then Play
      this.player.play();
    }
    else
      this.player.togglePause();
  }

  changedPlayingTime(currTime: string) {
   if(this.player.state==6){ // If its stoped then Play
      this.player.play();
      this.player.onPlaying= ()=>{ //wait until the video is playing
        let targetTime: number = this._videoDuration * (Number.parseFloat(currTime) / 100);
        this.player.time = targetTime;
      }
    }
  }
  changingPlayingTime(currTime: string) {
    if(this.player.state != 8){ // If its not error
      let targetTime: number = this._videoDuration * (Number.parseFloat(currTime) / 100);
      this.player.time = targetTime;
      this.player.play();
    }
  }
  changeVolume(currVolume: string) {
    this.player.volume= Number.parseFloat(currVolume);
  }

  getVLCPlayer(): any {
    return this.player;
  }

  setVideo(dashboardSettings: FileModel) {
    this.currentVideo = dashboardSettings;
  }

  private routeToFile(route: String): string{
    route = route.replace("\\", "/");
    route = route.replace("&#32;", "/");
    return `file:///${route}`;
  }
}
