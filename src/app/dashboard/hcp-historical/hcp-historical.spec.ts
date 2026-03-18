import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpHistorical } from './hcp-historical';

describe('HcpHistorical', () => {
  let component: HcpHistorical;
  let fixture: ComponentFixture<HcpHistorical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcpHistorical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcpHistorical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
