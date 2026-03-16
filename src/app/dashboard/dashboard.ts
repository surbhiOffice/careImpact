import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  InputConfig,
  SearchBoxComponent,
  SearchConfig,
  SingleSelectComponent,
  SingleSelectConfig,
} from 'cats-ui-lib';
import { DashboardService } from './dashboard-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SearchBoxComponent, SingleSelectComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  constructor(private searchService: DashboardService, private router: Router) {
        this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });

    this.updateBreadcrumb();
  }

  updateBreadcrumb() {

    const url = this.router.url;

    const segments = url
      .split('/')
      .filter((x:any )=> x && x !== 'dashboard');

    this.breadcrumbs = ['Home', ...segments.map(s =>
      this.capitalize(s.replace('-', ' '))
    )];
  }

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  breadcrumbs: string[] = [];
  onSearch(value: string) {
    this.searchService.setSearch(value);
  }

  options = [
    { id: '1', name: 'SelectAll' },
    { id: '2', name: 'RPM' },
    { id: '3', name: 'CCM' },
  ];

  searchConfig: SearchConfig = {
    serachValue: '',
    placeholder: 'Search by Task ID , Task Type or Patient Name',
  };

  inputConfigText: InputConfig = {
    type: 'text',
    placeholder: 'Enter value',
  };



onInputSelectiontext(selected: any) {
  const service = selected?.name;   // RPM / CCM / SelectAll

  if (service === 'SelectAll') {
    this.searchService.selectService('');
  } else {
    this.searchService.selectService(service);
  }
}

  singleConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select Option',
    prefixLabel: 'Service',
  };
}
