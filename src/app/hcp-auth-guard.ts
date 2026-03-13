import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const hcpAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['/hcp-login']);
  return false;
};