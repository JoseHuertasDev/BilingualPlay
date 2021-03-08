import {  Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { DashboardSettings } from '../../Models/DashboardSettings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {

  settigns: DashboardSettings;
  private _playerService: PlayerService;
  private _routerService: Router;

  constructor(playerService: PlayerService, routerService: Router) {
    this._playerService = playerService;
    this._routerService = routerService;
    this.settigns = new DashboardSettings();
  }
  onPlay(): void {
    this._playerService.setVideo(this.settigns.video);
    //Navigate to the video panel
    this._routerService.navigateByUrl('/video-player');
  }
  ngOnInit(): void {
  }
}
