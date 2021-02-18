import {  Component, OnInit } from '@angular/core';
import { Video } from '../Models/video';

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

  ngOnInit(): void {
  }
}
