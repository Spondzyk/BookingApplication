import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsBannerComponent } from './bookings-banner.component';

describe('BookingsBannerComponent', () => {
  let component: BookingsBannerComponent;
  let fixture: ComponentFixture<BookingsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
