import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseVideoComponent } from './choose-video/choose-video.component';
import { SubtitleFileInputComponent } from './subtitle-file-input/subtitle-file-input.component';
import { VideoFileInputComponent } from './video-file-input/video-file-input.component';
import { LanguageSelectComponent } from './language-select/language-select.component';


@NgModule({
  declarations: [
    ChooseVideoComponent,
    SubtitleFileInputComponent,
    VideoFileInputComponent,
    LanguageSelectComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ChooseVideoComponent,
  ]
})
export class VideoDashboardModule { }
