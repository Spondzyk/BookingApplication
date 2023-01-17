import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToDeleteComponent } from './image-to-delete.component';

describe('ImageToDeleteComponent', () => {
  let component: ImageToDeleteComponent;
  let fixture: ComponentFixture<ImageToDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageToDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageToDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
