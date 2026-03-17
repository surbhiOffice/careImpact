import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLink } from './common-link';

describe('CommonLink', () => {
  let component: CommonLink;
  let fixture: ComponentFixture<CommonLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
