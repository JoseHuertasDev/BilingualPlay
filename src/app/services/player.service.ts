
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../Models/video';

import {BehaviorSubject, interval, Observable} from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  private webChimera = (<any>window).require("webchimera.js")

  private _router: Router;
  private player: any; // WebChimera

  //Observables
  videoDuration : BehaviorSubject<number> = new BehaviorSubject(0);
  currentTime: BehaviorSubject<number> = new BehaviorSubject(0);
  currentVolume: BehaviorSubject<number> = new BehaviorSubject(0);

  private _videoDuration: number = 0;
  private _currentTime: number = 0;

  intervalCurrentVideo: any;

  constructor(router: Router ) {
    this._router = router;
  }

  timeoutCurrentVideo(): void{
    this.intervalCurrentVideo = interval(50).subscribe(() => { //Updates currentTime periodically
      this._currentTime = this.player.time
      this.currentTime.next(this._currentTime);
    })
  }

  playVideo(videoToPlay: Video): void{
    //Set the current video
    //.currentVideo = videoToPlay;
    this.player = this.webChimera.createPlayer();

    if(videoToPlay.route)
      this.player.play(this.routeToFile(videoToPlay.route));

    this.player.onPlaying= ()=>{
      this._videoDuration = this.player.playlist.items[0].duration -10;
      this.videoDuration.next(this._videoDuration); // Notify the current video duration
      this.player.subtitles.track = 0;  // Disable subtitles of VLC
      this.timeoutCurrentVideo();
      this.currentVolume.next(this.player.volume);
    };

    //Navigate to the video panel
    this._router.navigateByUrl('/video-player');

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

  routeToFile(route: String): string{
    route = route.replace("\\", "/");
    route = route.replace("&#32;", "/");
    return `file:///${route}`;
  }
}
