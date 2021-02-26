import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  //(<any>window).require Allow us to get the native node modules
  webChimera = (<any>window).require("webchimera.js")
  renderer = (<any>window).require("wcjs-renderer");
  player: any;

  videoDuration: number = 1;
  currentTime: number = 0;
  interva:  any;
  intervalCurrentTime : Subscription | undefined;

  @ViewChild("CanvasPlayer") CanvasPlayer!: ElementRef<HTMLCanvasElement>;
  constructor() {
    this.player = this.webChimera.createPlayer();
    console.log(+9969)
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    let canvasNative = this.CanvasPlayer.nativeElement;
    let options = { /* Add renderer options here */ }

    this.renderer.bind(canvasNative, this.player, options);
    this.player.play("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");

    this.player.onPlaying= ()=>{
      this.videoDuration = this.player.playlist.items[0].duration -10;
    };
    this.intervalCurrentTime = interval(250).subscribe(() => { //Updates currentTime periodically
      if(this.player.state == 3) //If it's playing
        this.currentTime = this.player.time;
    });
    this.player.onEndReached = ()=>{
      this.intervalCurrentTime?.unsubscribe();
    }
  }
  ngOnDestroy(): void{
    this.player.close(); // Closes the video when destroy the component
    this.intervalCurrentTime?.unsubscribe();
  }
}
