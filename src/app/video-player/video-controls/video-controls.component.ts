import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faExpand} from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss'],
})
export class VideoControlsComponent implements OnInit, OnDestroy {
  window: any = (<any>window).require('electron').remote.getCurrentWindow();

  //Services
  _ngZone: NgZone;
  _playerService: PlayerService;

  //Subscritpions
  currentTimeSubscription: Subscription ;
  videoDurationSubscription: Subscription;

  //Observables
  currentVolume$: Observable<number>;

  //Props
  videoDuration:  number = 0;
  timeBarValue: number = 0;
  currentTime: number = 0;
  player: any;

  //Icons
  playIcon = faPlay;
  pauseIcon = faPause;
  muteIcon = faVolumeMute;
  volumeIcon = faVolumeUp;
  fullScreenIcon = faExpand;

  constructor(playerService: PlayerService, ngZone: NgZone) {
    this._playerService = playerService;
    this._ngZone = ngZone;

    this.currentVolume$ = this._playerService.currentVolume.asObservable();

    this.videoDurationSubscription = this._playerService.videoDuration.subscribe(
      (newValue)=> this.videoDurationChanged(newValue) );

    this.currentTimeSubscription = this._playerService.currentTime.subscribe(
      (newValue)=>this.currentTimeChanged(newValue) );

    this.player = this._playerService.getVLCPlayer();
  }

  millisToMinutesAndSeconds(millis: number): string {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number.parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  toggleFullScreen(): void {
    if(this.window.isFullScreen())
      this.window.setFullScreen(false);
    else
    this.window.setFullScreen(true);
  }
  videoDurationChanged(newValue: number){
    this._ngZone.run(()=>{
      this.videoDuration = newValue;
    })
  }
  currentTimeChanged(newTime: number) {
    this._ngZone.run(()=>{
      this.currentTime = newTime;
      this.timeBarValue = (100 / this.videoDuration) * newTime;
    })
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void{
    this.currentTimeSubscription.unsubscribe();
    this.videoDurationSubscription.unsubscribe();
  }

}
