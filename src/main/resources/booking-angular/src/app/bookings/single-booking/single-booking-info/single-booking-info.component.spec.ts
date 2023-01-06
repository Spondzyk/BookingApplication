import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookingInfoComponent } from './single-booking-info.component';

describe('SingleBookingInfoComponent', () => {
  let component: SingleBookingInfoComponent;
  let fixture: ComponentFixture<SingleBookingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBookingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBookingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
