import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Video } from '../../Models/video';
@Component({
  selector: 'app-video-file-input',
  templateUrl: './video-file-input.component.html',
  styleUrls: ['./video-file-input.component.scss']
})
export class VideoFileInputComponent implements OnInit {
  @ViewChild('inputVideo') inputVideo!: ElementRef;
  @Input() video!: Video ;
  constructor() {
  }

  ngOnInit(): void {
  }
  onFileSelected(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileName: string | undefined = element.files?.item(0)?.name;
    //With electron you can get the full absolute path of the file
    let route = this.inputVideo.nativeElement.files[0].path;
    if(this.video){
      this.video.title = fileName;
      this.video.route = route;
    }
  }
}
