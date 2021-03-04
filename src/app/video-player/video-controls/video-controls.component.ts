import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faExpand} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit, OnDestroy {
  intervalCurrentVolume: Subscription | undefined;
  window: any = (<any>window).require('electron').remote.getCurrentWindow();

  //Inputs
  @Input() videoDuration: number =0;
  @Input() player: any;
  @Input() currentTime: number = 0;
  currentVolume: number = 20;

  //Icons
  playIcon = faPlay;
  pauseIcon = faPause;
  muteIcon = faVolumeMute;
  volumeIcon = faVolumeUp;
  fullScreenIcon = faExpand;
  constructor() {
  }


  timeBarValue: number = 0;
  changingVolume(currVolume: string): void{
      this.player.volume= Number.parseFloat(currVolume);
  }
  changingPlayingTime(currTime: string): void{
    if(this.player.state != 8){ // If its not error
      let targetTime: number = this.videoDuration * (Number.parseFloat(currTime) / 100);
      this.player.time = targetTime;
      this.player.play();
    }
  }
  inputChangedPlayingTime(currTime: string): void{
    if(this.player.state==6){ // If its stoped then Play
      this.player.play();
      this.player.onPlaying= ()=>{ //wait until the video is playing
        let targetTime: number = this.videoDuration * (Number.parseFloat(currTime) / 100);
        this.player.time = targetTime;
      }
    }
  }
  //Methods
  togglePause(): void {

    if(this.player.state==6){ // If its stoped then Play
      this.player.play();
    }
    else
      this.player.togglePause();
  }
  mute(): void {
    this.player.toggleMute();
  }
  toggleFullScreen(): void {
    //TO-DO
    console.log("Toggle full screen");
    if(this.window.isFullScreen())
      this.window.setFullScreen(false);
    else
    this.window.setFullScreen(true);
  }
  ngOnChanges(changes: SimpleChanges) {
    //This method is called by the parent when changes currentValue
    if(changes.currentTime){
      let updatedTime = changes.currentTime.currentValue;
      this.timeBarValue = (100 / this.videoDuration) * updatedTime;
    }
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void{
    this.intervalCurrentVolume = interval(50).subscribe(() => { //Updates currentTime periodically
      this.currentVolume = this.player.volume
    });
  }
  ngOnDestroy(): void{
    this.intervalCurrentVolume?.unsubscribe;
  }

}
