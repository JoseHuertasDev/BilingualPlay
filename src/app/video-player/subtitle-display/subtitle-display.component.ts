import { Component, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubtitleService } from 'src/app/services/subtitle/subtitle.service';

@Component({
  selector: 'app-subtitle-display',
  templateUrl: './subtitle-display.component.html',
  styleUrls: ['./subtitle-display.component.scss']
})
export class SubtitleDisplayComponent implements OnInit {

  private _subtitleService: SubtitleService;
  private currentSubtitleSubscription: Subscription;
  mainSubtitle: string | undefined;
  secondarySubtitle: string | undefined;
  private _ngZone: NgZone;

  constructor( subtitleService: SubtitleService, ngZone: NgZone) {
    this._ngZone = ngZone;
    this._subtitleService = subtitleService;
    this._subtitleService.playSubs();
    this.currentSubtitleSubscription = this._subtitleService.currentSubBehavior.subscribe(data=>{
      this._ngZone.run(()=>{
        if(this.mainSubtitle !== data[0]) this.mainSubtitle = data[0];
        if(this.secondarySubtitle !== data[1]) this.secondarySubtitle = data[1];

      })
    });
   }

  ngOnInit(): void {
  }

}
