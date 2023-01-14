import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelBookingComponent } from './dialog-cancel-booking.component';

describe('DialogCancelBookingComponent', () => {
  let component: DialogCancelBookingComponent;
  let fixture: ComponentFixture<DialogCancelBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCancelBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCancelBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
