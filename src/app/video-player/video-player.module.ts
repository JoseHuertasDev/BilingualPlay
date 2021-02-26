import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoControlsComponent } from './video-controls/video-controls.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [PlayerComponent, VideoControlsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PlayerComponent
  ]
})
export class VideoPlayerModule { }
