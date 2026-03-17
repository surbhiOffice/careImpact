import { Component, computed } from '@angular/core';
import { SnackbarService } from './snackBarService';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snack-bar-comp',
  imports: [NgClass],
  templateUrl: './snack-bar-comp.html',
  styleUrl: './snack-bar-comp.scss',
})
export class SnackBarComp {
  constructor(public service: SnackbarService, private router: Router) { }

  // read signal
  toasts = computed(() => this.service.toastArr());

  closeToast(timestamp: number) {
    this.service.removeToastItem(timestamp)
  }
  formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString();
  }


// handleAction(btn: string, toast: any) {

//   switch (btn) {

//     case 'close':
//       this.service.removeToastItem(toast.timestamp);
//       break;

//     case 'view':
//     case 'home':
//       if (toast.router) {
//         this.router.navigate(
//           Array.isArray(toast.router) ? toast.router : [toast.router],
//           toast.navigationExtras
//         );
//       }
//       break;

//     case 'undo':
//       console.log('Undo clicked');
//       break;

//     case 'retry':
//       console.log('Retry clicked');
//       break;

//     default:
//       console.log('Unknown action');
//   }

// }
handleAction(btn: string, toast: any) {
  switch (btn) {
    case 'close':
      this.service.removeToastItem(toast.timestamp);
      break;

    case 'view':
    case 'home':

      if (!toast.router) return;
      let route: any;

      if (Array.isArray(toast.router)) {
        // old-style array routers
        const index = toast.buttonText.indexOf(btn) - 1; 
        if (Array.isArray(toast.router[0])) {
          route = toast.router[index];
        } else {
          route = toast.router;
        }
      } else {
        route = toast.router[btn] ?? toast.router;
      }

      if (route) {
        this.router.navigate(route, toast.navigationExtras);
      }

      break;

    case 'undo':
      console.log('Undo clicked');
      break;

    case 'retry':
      console.log('Retry clicked');
      break;

    default:
      console.log('Unknown action');
  }
}
}
