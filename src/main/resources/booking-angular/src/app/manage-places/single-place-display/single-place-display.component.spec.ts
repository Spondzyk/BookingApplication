import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlaceDisplayComponent } from './single-place-display.component';

describe('SinglePlaceDisplayComponent', () => {
  let component: SinglePlaceDisplayComponent;
  let fixture: ComponentFixture<SinglePlaceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlaceDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePlaceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
