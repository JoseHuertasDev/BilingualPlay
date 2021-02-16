import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseVideoComponent } from './choose-video/choose-video.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
