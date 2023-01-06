import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingStarComponent } from './ranking-star.component';

describe('RankingStarComponent', () => {
  let component: RankingStarComponent;
  let fixture: ComponentFixture<RankingStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingStarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
