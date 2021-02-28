import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoControlsComponent } from './video-controls/video-controls.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputRangeLoaderComponent } from './input-range-loader/input-range-loader.component';


@NgModule({
  declarations: [PlayerComponent, VideoControlsComponent, InputRangeLoaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class VideoPlayerModule { }
