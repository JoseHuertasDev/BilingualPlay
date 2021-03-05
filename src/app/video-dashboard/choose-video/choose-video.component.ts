import {  Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Video } from '../../Models/video';

@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {

  private video: Video;
  private _playerService: PlayerService;
  constructor(playerService: PlayerService) {
    this._playerService = playerService;
    this.video = new Video();
  }
  onPlay(): void {
    this._playerService.playVideo(this.video);
  }
  ngOnInit(): void {
  }
}
