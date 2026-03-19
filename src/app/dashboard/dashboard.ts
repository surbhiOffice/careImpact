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
  isHistoricalRoute = false;
  isTaskDetailRoute = false;
  constructor(
    private searchService: DashboardService,
    private router: Router,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateBreadcrumb();
    });
    this.updateBreadcrumb();
  }

  ngOnInit() {
    this.setRouteFlags(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setRouteFlags(event.urlAfterRedirects);
      });
  }

  setRouteFlags(url: string) {
    this.isHistoricalRoute = url.includes('hcp-historical');
    this.isTaskDetailRoute = /^\/dashboard\/tasks\/[^\/]+$/.test(url);
  }
  updateBreadcrumb() {
    const url = this.router.url;
    const segments = url.split('/').filter((x: any) => x && x !== 'dashboard');
    this.breadcrumbs = ['Home', ...segments.map((s) => this.capitalize(s.replace('-', ' ')))];
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
  status = [
    { id: '1', name: 'SelectAll' },
    { id: '2', name: 'To Do' },
    { id: '3', name: 'Overdue' },
    { id: '4', name: 'Completed' },
  ];
  priority = [
    { id: '1', name: 'SelectAll' },
    { id: '2', name: 'Urgent' },
    { id: '3', name: 'Important' },
    { id: '4', name: 'Regular' },
  ];
  taskType = [
    { id: '1', name: 'SelectAll' },
    { id: '2', name: 'Reading' },
    { id: '3', name: 'Abnormal Reading' },
    { id: '4', name: 'Follow Up' },
    { id: '5', name: 'Patient Reminder' },
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
    const service = selected?.name; // RPM / CCM / SelectAll

    if (service === 'SelectAll') {
      this.searchService.selectService('');
    } else {
      this.searchService.selectService(service);
    }
  }

  onStatusSelection(selected: any) {
    const status = selected?.name;
    if (status === 'SelectAll') {
      this.searchService.selectStatus('');
    } else {
      this.searchService.selectStatus(status);
    }
  }

  onTaskTypeSelection(selected: any) {
    const taskType = selected?.name;
    if (taskType === 'SelectAll') {
      this.searchService.selectTaskType('');
    } else {
      this.searchService.selectTaskType(taskType);
    }
  }

  onPrioritySelection(selected: any) {
    const priority = selected?.name;
    if (priority === 'SelectAll') {
      this.searchService.selectPriority('');
    } else {
      this.searchService.selectPriority(priority);
    }
  }

  singleConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select Service',
    prefixLabel: 'Service',
  };
  priorityConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select Priority',
    prefixLabel: 'Priority',
  };
  taskConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select Task Type',
    prefixLabel: 'Task Type',
  };
  statusConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select status',
    prefixLabel: 'Status',
  };
}
