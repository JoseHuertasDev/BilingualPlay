import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFileInputComponent } from './video-file-input.component';

describe('VideoFileInputComponent', () => {
  let component: VideoFileInputComponent;
  let fixture: ComponentFixture<VideoFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
