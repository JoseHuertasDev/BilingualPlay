import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseVideoComponent } from './choose-video/choose-video.component';
import { SubtitleFileInputComponent } from './subtitle-file-input/subtitle-file-input.component';
import { VideoFileInputComponent } from './video-file-input/video-file-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseVideoComponent,
    SubtitleFileInputComponent,
    VideoFileInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
