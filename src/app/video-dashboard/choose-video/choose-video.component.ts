import {  Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { DashboardSettings } from '@Models/DashboardSettings';
import { Router } from '@angular/router';
import { SubtitleService } from 'src/app/services/subtitle.service';

@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {

  settigns: DashboardSettings;
  private _playerService: PlayerService;
  private _routerService: Router;
  private _subtitleService: SubtitleService;

  constructor(playerService: PlayerService,
    routerService: Router,
    subtitleService: SubtitleService) {
    this._playerService = playerService;
    this._routerService = routerService;
    this._subtitleService = subtitleService;

    this.settigns = new DashboardSettings();
  }
  onPlay(): void {
    this._playerService.setVideo(this.settigns.video);
    this._subtitleService.setFile(this.settigns.mainSubs);
    //Navigate to the video panel
    this._routerService.navigateByUrl('/video-player');
  }
  ngOnInit(): void {
  }
}
