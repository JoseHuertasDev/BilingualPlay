import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faExpand} from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss'],
})
export class VideoControlsComponent implements OnInit, OnDestroy {

  //Services
  _ngZone: NgZone;
  _playerService: PlayerService;

  //Subscritpions
  currentTimeSubscription: Subscription ;
  videoDurationSubscription: Subscription;

  //Props
  videoDuration:  number = 0;
  timeBarValue: number = 0;
  currentTime: number = 0;
  player: any;

  //Outputs
  @Output() toggleFullScreen: EventEmitter<void> = new EventEmitter();


  constructor(playerService: PlayerService, ngZone: NgZone) {
    this._playerService = playerService;
    this._playerService.playVideo();//Starts video playing

    this._ngZone = ngZone;

    //Updates the video duration
    this.videoDurationSubscription = this._playerService.videoDuration.subscribe(
      (newValue)=> this.videoDurationChanged(newValue) );

    //Updates the video current time
    this.currentTimeSubscription = this._playerService.currentTime.subscribe(
      (newValue)=>this.currentTimeChanged(newValue) );

    this.player = this._playerService.getVLCPlayer();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void{
    this.currentTimeSubscription.unsubscribe();
    this.videoDurationSubscription.unsubscribe();
  }

  currentTimeChanged(newTime: number) {
    this._ngZone.run(()=>{ // This is because currentTime is changed outside the ngZone
      this.currentTime = newTime;
      this.timeBarValue = (100 / this.videoDuration) * newTime;
    })
  }

  millisToMinutesAndSeconds(millis: number): string {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number.parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  videoDurationChanged(newValue: number){
    this._ngZone.run(()=>{ // This is because videoDuration is changed outside the ngZone
      this.videoDuration = newValue;
    })
  }



  //Icons
  fullScreenIcon = faExpand;
  muteIcon = faVolumeMute;
  playIcon = faPlay;
  pauseIcon = faPause;
  volumeIcon = faVolumeUp;
}
