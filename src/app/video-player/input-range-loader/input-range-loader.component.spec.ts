import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRangeLoaderComponent } from './input-range-loader.component';

describe('InputRangeLoaderComponent', () => {
  let component: InputRangeLoaderComponent;
  let fixture: ComponentFixture<InputRangeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRangeLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRangeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
