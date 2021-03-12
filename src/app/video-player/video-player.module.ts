import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoControlsComponent } from './video-controls/video-controls.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputRangeLoaderComponent } from './input-range-loader/input-range-loader.component';
import { SubtitleDisplayComponent } from './subtitle-display/subtitle-display.component';


@NgModule({
  declarations: [PlayerComponent, VideoControlsComponent, InputRangeLoaderComponent, SubtitleDisplayComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class VideoPlayerModule { }
