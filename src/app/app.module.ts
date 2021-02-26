import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoDashboardModule } from './video-dashboard/video-dashboard.module';
import { VideoPlayerModule } from './video-player/video-player.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    VideoDashboardModule,
    VideoPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
