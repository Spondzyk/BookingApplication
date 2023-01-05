import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceDialogComponent } from './acceptance-dialog.component';

describe('AcceptanceDialogComponent', () => {
  let component: AcceptanceDialogComponent;
  let fixture: ComponentFixture<AcceptanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
