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
  currentSubtitle: string | undefined;
  private _ngZone: NgZone;

  constructor( subtitleService: SubtitleService, ngZone: NgZone) {
    this._ngZone = ngZone;
    this._subtitleService = subtitleService;
    this._subtitleService.playSubs();
    this.currentSubtitleSubscription = this._subtitleService.currentSubBehavior.subscribe(data=>{
      this._ngZone.run(()=>{
        console.log(data);
        if(data !== this.currentSubtitle)
          this.currentSubtitle = data;
      })
    });
   }

  ngOnInit(): void {
  }

}
