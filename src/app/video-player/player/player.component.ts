import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  //(<any>window).require Allow us to get the native node modules
  renderer = (<any>window).require("wcjs-renderer");
  private _playerService: PlayerService;
  @ViewChild("CanvasPlayer") CanvasPlayer!: ElementRef<HTMLCanvasElement>;

  constructor(playerService: PlayerService) {
    this._playerService = playerService;
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    let canvasNative = this.CanvasPlayer.nativeElement;
    let options = { /* Add renderer options here */ }
    this.renderer.bind(canvasNative, this._playerService.getVLCPlayer(), options);
  }
}
