import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FileModel } from 'src/app/Models/FileModel';
@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  @Input() file!: FileModel ;
  constructor() {
  }

  ngOnInit(): void {
  }
  onFileSelected(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileName: string | undefined = element.files?.item(0)?.name;
    //With electron you can get the full absolute path of the file
    let route = this.inputFile.nativeElement.files[0].path;
    if(this.file){
      this.file.title = fileName;
      this.file.route = route;
    }
  }
}
