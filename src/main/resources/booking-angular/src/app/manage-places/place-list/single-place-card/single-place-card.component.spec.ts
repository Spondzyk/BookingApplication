import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlaceCardComponent } from './single-place-card.component';

describe('SinglePlaceCardComponent', () => {
  let component: SinglePlaceCardComponent;
  let fixture: ComponentFixture<SinglePlaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlaceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePlaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
