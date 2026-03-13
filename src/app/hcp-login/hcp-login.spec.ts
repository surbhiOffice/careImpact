import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpLogin } from './hcp-login';

describe('HcpLogin', () => {
  let component: HcpLogin;
  let fixture: ComponentFixture<HcpLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcpLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcpLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
