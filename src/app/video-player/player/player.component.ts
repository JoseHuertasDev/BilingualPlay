import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  //(<any>window).require Allow us to get the native node modules
  webChimera = (<any>window).require("webchimera.js")
  renderer = (<any>window).require("wcjs-renderer");
  player: any;
  @ViewChild("CanvasPlayer") CanvasPlayer!: ElementRef<HTMLCanvasElement>;
  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    let canvasNative = this.CanvasPlayer.nativeElement;
    this.player = this.webChimera.createPlayer();
    let options = { /* Add renderer options here */ }
    this.renderer.bind(canvasNative, this.player, options);
    this.player.play("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");
    this.player.mute = true;
  }
  ngOnDestroy(): void{
    this.player.stop();
    this.player.close(); // Closes the video when destroy the component
  }
}
