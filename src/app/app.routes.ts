import { Routes } from "@angular/router";
import { ChooseVideoComponent } from "./video-dashboard/choose-video/choose-video.component";
import { PlayerComponent } from "./video-player/player/player.component";

export const routes: Routes =
  [
    {path: 'video-player', component: PlayerComponent},
    {path: 'video-dashboard', component: ChooseVideoComponent},
    {path: '', redirectTo: '/video-dashboard', pathMatch: 'full'},
  ];
