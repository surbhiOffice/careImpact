import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    searchValue = signal<string>('');
    hcpServiceFilter = signal<string>('');

  setSearch(value: string) {
    this.searchValue.set(value);
  }
 
  selectService(service: string) {
    this.hcpServiceFilter.set(service);
  }
}
