import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoBookingsComponent } from './dialog-no-bookings.component';

describe('DialogNoBookingsComponent', () => {
  let component: DialogNoBookingsComponent;
  let fixture: ComponentFixture<DialogNoBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNoBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
