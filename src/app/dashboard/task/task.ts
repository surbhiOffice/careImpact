import { Component, computed, effect, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CatsDataGridComponent, CommonRendererComponent } from 'cats-data-grid';
import { DashboardService } from '../dashboard-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonLink } from '../../common-link/common-link';
import { NgTemplateOutlet } from '@angular/common';
import { AddTaskForm } from '../add-task-form/add-task-form';

@Component({
  selector: 'app-task',
  imports: [CatsDataGridComponent, NgTemplateOutlet, AddTaskForm],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  patient!: Signal<any[]>;
  currentPatient: any = null;
  showForm = signal(false);

  constructor(
    private searchService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.patient = this.searchService.patients;

    effect(() => {
      this.searchService.searchValue(); // watch signal
      this.page = 0; // reset pagination
      this.updatePagedData(); // update table
    });
  }

  ngOnInit() {
    this.updatePagedData();
  }

  filteredRows = computed(() => {
    const search = this.searchService.searchValue().toLowerCase();
    const service = this.searchService.hcpServiceFilter()?.toLowerCase() || '';
    const rows = this.patient();

    return rows.filter((row: any) => {
      const matchesSearch =
        !search ||
        Object.values(row).some((value: any) => value?.toString().toLowerCase().includes(search));
      const matchesService = !service || row.service?.toLowerCase() === service;
      return matchesSearch && matchesService;
    });
  });

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
          Urgent: '#E58900',
          Important: '#017DB9',
          Regular: '#27A468',
        };

        const color = colorMap[value] || '#000';

        return `
<span style="
 display:inline-block;
  text-align:center;
  min-width:90px;
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
    this.router.navigate(['/dashboard/tasks', task.taskId], {
      state: { task },
    });
  }
}
