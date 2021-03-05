import { Component, Input, OnInit, Output,EventEmitter, HostBinding, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-input-range-loader',
  templateUrl: './input-range-loader.component.html',
  styleUrls: ['./input-range-loader.component.scss']
})
export class InputRangeLoaderComponent implements OnInit {
  private _changeDetector: ChangeDetectorRef;

  @Output() valueChanged =  new EventEmitter<string>();
  @Output() valueChanging =  new EventEmitter<string>();

  @Input() inputValue: number = 0.1;
  @Input() min: number = 0;
  @Input() max!: number;
  @Input() colorBar: string = "rgba(0,0,0,1)";

  @ViewChild('barLoader') barLoader!: ElementRef;

  @HostBinding("style.--background-color") get getBackgroundColor() {
    return this.colorBar;
 }
  @HostBinding("style.--value") get getValue() {
    this._changeDetector.detectChanges();
    if(this.barLoader){
      return Number.parseFloat(this.barLoader.nativeElement.value) - this.min;
    }
    return this.inputValue - this.min;
  }
  constructor( changeDetector : ChangeDetectorRef) {
    this._changeDetector = changeDetector;
  }

  ngOnInit(): void {
  }

}
