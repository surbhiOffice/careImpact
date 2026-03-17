import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComp } from './snack-bar-comp';

describe('SnackBarComp', () => {
  let component: SnackBarComp;
  let fixture: ComponentFixture<SnackBarComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
