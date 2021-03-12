import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseVideoComponent } from './choose-video/choose-video.component';
import { FileInputComponent } from './file-input/file-input.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ChooseVideoComponent,
    FileInputComponent,
    LanguageSelectComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports:[
    ChooseVideoComponent,
  ]
})
export class VideoDashboardModule { }
