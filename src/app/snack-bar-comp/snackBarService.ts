

import { Injectable, signal } from '@angular/core';

export interface SnackBarData {
  type:
    | 'success'
    | 'save'
    | 'generic'
    | 'delete'
    | 'error'
    | 'notification'
    | 'warning'
    | 'processing';
  timestamp: number;
  toastData: string;
  title?:string;
  buttonText: ('close' | 'undo' | 'retry' | 'view'|'home')[];
  router?: {
    [key: string]: any[];   // button name → route
  };

  navigationExtras?: {
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  toastArr = signal<SnackBarData[]>([]);
// =================================================================================================
// open method 
  open(data: {
  toastData: string;
  title?:string;
  type: SnackBarData['type'];
  buttonText?: ('undo' | 'retry' | 'view'|'home')[];
  router?: { [key: string]: any[] };
  navigationExtras?: { [key: string]: any };
}) {

  const buttons = ['close',   ...(data.buttonText ?? [])] as (
    'close' | 'undo' | 'retry' | 'view'|'home'
  )[];

  
  const item: SnackBarData = {
    type: data.type,
    toastData: data.toastData,
    title:data.title,
    timestamp: Date.now(),
    buttonText: buttons,
    router: data.router,
    navigationExtras: data.navigationExtras,
  };

  this.toastArr.update(arr => [...arr, item]);

  setTimeout(() => {
    this.removeToastItem(item.timestamp);
  }, 3000);  
}
  // =================================================================================================
  // the list of active toasts 
  removeToastItem(timestamp: number) {
    const arr = this.toastArr();
    const index = arr.findIndex(t => t.timestamp === timestamp);

    if (index >= 0) {
      arr.splice(index, 1);
      this.toastArr.set([...arr]);
    }
  }
}

 