import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAccount } from './dialog-delete-account.component';

describe('DialogCancelBookingComponent', () => {
  let component: DialogDeleteAccount;
  let fixture: ComponentFixture<DialogDeleteAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteAccount ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
