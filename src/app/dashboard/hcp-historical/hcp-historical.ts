import { Component, computed, effect, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CatsDataGridComponent } from 'cats-data-grid';
import { DashboardService, HistoricalPatient, Patient } from '../dashboard-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonLink } from '../../common-link/common-link';
// import {filterData} from '../../../Utilities/filterUtilities';
@Component({
  selector: 'app-hcp-historical',
  imports: [CatsDataGridComponent],
  templateUrl: './hcp-historical.html',
  styleUrl: './hcp-historical.scss',
})
export class HcpHistorical implements OnInit {
  patient!: Signal<HistoricalPatient[]>;
  originalData!: Signal<HistoricalPatient[]>;
  filteredData = signal<HistoricalPatient[]>([]);
  currentPatient: any = null;
  showForm = signal(false);

  filters = signal<any>({
    search: '',
    service: '',
    status: '',
  });
  ngOnInit() {
    this.originalData = this.patient;
    this.filteredData.set(this.patient());
    this.updatePagedData();
  }
  constructor(
    private searchService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.patient = this.searchService.historicalData;

    effect(() => {
      const data = this.filteredRows(); //  automatically tracks all dependencies
      this.page = 0;
      this.updatePagedData();
    });
  }

  filteredRows = computed(() => {
    const search = this.searchService.searchValue().toLowerCase();
    const service = this.searchService.hcpServiceFilter()?.toLowerCase() || '';
    const status = this.searchService.hcpStatusFilter()?.toLowerCase() || '';
    const taskType = this.searchService.hcpTaskTypeFilter()?.toLowerCase() || '';
    const priority = this.searchService.hcpPriorityFilter()?.toLowerCase() || '';
    const rows = this.patient();

    // return rows.filter((row: Patient) => {
    //     const matchesSearch =
    //     !search ||
    //     Object.values(row).some((value: any) => value?.toString().toLowerCase().includes(search));
    //   const matchesPriority =
    //     !priority || row.taskPriority?.toLowerCase()=== priority;
    //   const matchesService = !service || row.service?.toLowerCase()=== service;

    //   const matchesStatus = !status || row.taskStatus?.toLowerCase()=== status;

    //   const matchesTaskType = !taskType || row.taskType?.toLowerCase() === taskType;
    //   return  matchesSearch && matchesService && matchesStatus && matchesTaskType && matchesPriority;
    // });
 return rows.filter((row: Patient) => {
  const matchesSearch =
    !search ||
    Object.values(row).some((value: any) =>
      value?.toString().toLowerCase().includes(search)
    );

  const matchesPriority =
    !priority ||
    row.taskPriority?.toLowerCase().trim() === priority.trim();

  const matchesService =
    !service ||
    row.service?.toLowerCase().trim() === service.trim();

  const matchesStatus =
    !status ||
    row.taskStatus?.toLowerCase().trim() === status.trim();

  const matchesTaskType =
    !taskType ||
    row.taskType?.toLowerCase().trim() === taskType.trim();

  return (
    matchesSearch &&
    matchesService &&
    matchesStatus &&
    matchesTaskType &&
    matchesPriority
  );
});
  });
  onInputSelectiontext(selected: any) {
    const service = selected?.name; // RPM / CCM / SelectAll

    if (service === 'SelectAll') {
      this.searchService.selectService('');
    } else {
      this.searchService.selectService(service);
    }
  }
  page = 0;
  pageSize = 20;
  pagedData: any[] = [];

  tableOption: WritableSignal<any> = signal({
    parentRef: this,
    noDataTemplate: null,
  });
  colDef = [
    {
      fieldName: 'taskId',
      headerName: 'Task ID',
      cellRenderer: CommonLink,
    },
    {
      fieldName: 'taskPriority',
      headerName: 'Task Priority',
      cellRenderer: (params: any) => {
        const value = params.value;

        const colorMap: any = {
          Urgent: '#ff4d4f',
          Important: '#6fbdeb',
          Regular: '#52c41a',
        };

        const color = colorMap[value] || '#000';

        return `
<span style="
  color:${color};
  border:1px solid ${color};
  background:${color}1A;
  padding:2px 8px;
  border-radius:6px;
  font-weight:500;
  font-size:12px;
">
  ${value}
</span>
`;
      },
    },
    { fieldName: 'service', headerName: 'Service' },
    { fieldName: 'taskType', headerName: 'Task Type' },
    { fieldName: 'taskDetails', headerName: 'Task Details' },
    {
      fieldName: 'taskStatus',
      headerName: 'Task Status',
      cellRenderer: (params: any) => {
        const value = params.value;

        let icon = '';

        switch (value) {
          case 'Completed':
            icon = '✅';
            break;
          case 'To Do':
            icon = `<img src="clock.png" width="16" height="16" />`;
            break;
          case 'Overdue':
            icon = '⚠️';
            break;
          default:
            icon = 'ℹ️';
        }

        return `<span style="display:flex;align-items:center;gap:6px">
              <span>${icon}</span>
              <span>${value}</span>
            </span>`;
      },
    },
    {
      fieldName: 'patient',
      headerName: 'Patient Name',
      cellRenderer: (params: any) => {
        const name = params.value || '';

        const parts = name.split(' ');
        const first = parts[0]?.charAt(0) || '';
        const last = parts[1]?.charAt(0) || '';

        const initials = (first + last).toUpperCase();

        return `
      <div style="display:flex;align-items:center;gap:8px">
        <div style="
          width:28px;
          height:28px;
          border-radius:50%;
          background:#e6f4ff;
          color:#1677ff;
          font-weight:600;
          font-size:12px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          ${initials}
        </div>
        <span>${name}</span>
      </div>
    `;
      },
    },
    { fieldName: 'dueDate', headerName: 'Due Date' },
  ];
  onclick() {
    this.currentPatient = null;
    this.showForm.set(true);
  }
  onSelectedRows(rows: any[]) {
    console.log('Selected rows:', rows);
  }

  updatePagedData() {
    const filtered = this.filteredRows(); //use signal result
    const startIndex = this.page * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedData = filtered.slice(startIndex, endIndex);
  }

  pageChange(event: any) {
    console.log('Pagination event:', event);
    // debugger
    this.page = event.page;
    this.pageSize = event.pageSize;

    this.updatePagedData();
  }

  onFormClosed() {
    this.showForm.set(false);
  }
  onLineClicked(param: any) {
    // console.log('Clicked:', param);
    const task = param;
    // this.router.navigate(['/dashboard/tasks', task.taskId], {
    //   state: { task },
    // });
  }
}
