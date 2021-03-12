import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleDisplayComponent } from './subtitle-display.component';

describe('SubtitleDisplayComponent', () => {
  let component: SubtitleDisplayComponent;
  let fixture: ComponentFixture<SubtitleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
