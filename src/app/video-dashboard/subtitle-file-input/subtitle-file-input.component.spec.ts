import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleFileInputComponent } from './subtitle-file-input.component';

describe('SubtitleFileInputComponent', () => {
  let component: SubtitleFileInputComponent;
  let fixture: ComponentFixture<SubtitleFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
