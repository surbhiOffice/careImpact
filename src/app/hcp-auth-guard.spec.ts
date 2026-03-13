import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hcpAuthGuard } from './hcp-auth-guard';

describe('hcpAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hcpAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
