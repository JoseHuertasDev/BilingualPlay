import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subtitle } from '../../Models/subtitles';

@Component({
  selector: 'app-subtitle-file-input',
  templateUrl: './subtitle-file-input.component.html',
  styleUrls: ['./subtitle-file-input.component.scss']
})
export class SubtitleFileInputComponent implements OnInit {
  @ViewChild('inputSubtitle') inputSubtitle!: ElementRef;
  subs: Subtitle;
  constructor() {
    this.subs = new Subtitle();
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileName: string | undefined = element.files?.item(0)?.name;
    //With electron you can get the full absolute path of the file
    let route = this.inputSubtitle.nativeElement.files[0].path;
    if (fileName) {
      this.subs.title = fileName;
      this.subs.route = route;
    }
  }
}
