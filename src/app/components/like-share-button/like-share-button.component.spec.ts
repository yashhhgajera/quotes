import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeShareButtonComponent } from './like-share-button.component';

describe('LikeShareButtonComponent', () => {
  let component: LikeShareButtonComponent;
  let fixture: ComponentFixture<LikeShareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeShareButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
