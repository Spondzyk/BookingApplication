import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCardComponent } from './bookings-card.component';

describe('BookingsCardComponent', () => {
  let component: BookingsCardComponent;
  let fixture: ComponentFixture<BookingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
