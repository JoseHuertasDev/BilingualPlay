import {  Component, OnInit } from '@angular/core';
import { Language } from 'src/app/Models/language';
import { Video } from '../../Models/video';

@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {

  video: Video;
  constructor() {
    this.video = new Video();
  }
  onPlay(value: Language): void {
    console.log(this.video);
  }
  ngOnInit(): void {
  }
}
