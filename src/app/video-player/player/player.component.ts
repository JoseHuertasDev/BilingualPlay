import { Component, ElementRef, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  //(<any>window).require Allow us to get the native node modules
  renderer = (<any>window).require("wcjs-renderer");
  window: any = (<any>window).require('electron').remote.getCurrentWindow();

  private _playerService: PlayerService;


  @ViewChild("CanvasPlayer") CanvasPlayer!: ElementRef<HTMLCanvasElement>;

  userActive: boolean = true;
  intervalUserActivity: Observable<number> | undefined;
  userActivitySubscription: Subscription | undefined;

  private readonly  timeToHideControls: number = 3000;

  constructor(playerService: PlayerService) {
    this._playerService = playerService;
    this.setTimeoutUserActive();
  }

  setTimeoutUserActive() {
    this.intervalUserActivity = interval(this.timeToHideControls);
    this.userActivitySubscription = this.intervalUserActivity.subscribe(() => { //Updates currentTime periodically
      this.userActive = false;
    })
  }

  @HostListener('window:mousemove') refreshUserState() {
    //When the mouse moves set the user as active
    this.userActive = true;
    this.userActivitySubscription?.unsubscribe();
    this.setTimeoutUserActive(); // Restarts the count to set userActive as false
  }
  ngOnInit(): void {
  }


  ngAfterViewInit(): void{
    let canvasNative = this.CanvasPlayer.nativeElement;
    let options = { /* Add renderer options here */ }
    this.renderer.bind(canvasNative, this._playerService.getVLCPlayer(), options);
  }

  toggleFullScreen(): void {
    if(this.window.isFullScreen())
      this.window.setFullScreen(false);
    else
    this.window.setFullScreen(true);
  }
}
