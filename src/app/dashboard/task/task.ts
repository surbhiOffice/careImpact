import { Component, computed, effect, OnInit } from '@angular/core';
import { CatsDataGridComponent, CommonRendererComponent } from 'cats-data-grid';
import { DashboardService } from '../dashboard-service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [CatsDataGridComponent, RouterOutlet],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  constructor(
    private searchService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
 
    effect(() => {
      this.searchService.searchValue(); // watch signal
      this.page = 0; // reset pagination
      this.updatePagedData(); // update table
    });
  }



  filteredTasks = computed(() => {
    const search = this.searchService.searchValue().toLowerCase();
    const service = this.searchService.hcpServiceFilter()?.toLowerCase() || '';

    return this.data.filter((task) => {
      const matchesSearch =
        !search ||
        task.taskId.toLowerCase().includes(search) ||
        task.patient.toLowerCase().includes(search) ||
        task.taskType.toLowerCase().includes(search);

      const matchesService = !service || task.service.toLowerCase() === service;

      return matchesSearch && matchesService;
    });
  });

  page = 0;
  pageSize = 20;
  pagedData: any[] = [];

  data = [
    {
      taskId: 'RPM001',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Micky Mouse',
      dueDate: '2023-03-10',
    },
    {
      taskId: 'RPM002',
      taskPriority: 'Urgent',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Clark Kent',
      dueDate: '2023-03-10',
    },
    {
      taskId: 'RPM003',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Adam Sandler',
      dueDate: '2023-03-10',
    },
    {
      taskId: 'CCM001',
      taskPriority: 'Regular',
      service: 'CCM',
      taskType: 'Follow Up',
      taskDetails: 'Follow up with Patient',
      taskStatus: 'To Do',
      patient: 'Lorretta Flamings',
      dueDate: '2023-03-10',
    },
    {
      taskId: 'RPM004',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Adam Sandler',
      dueDate: '2023-03-10',
    },
    {
      taskId: 'RPM005',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Bruce Wayne',
      dueDate: '2023-03-11',
    },
    {
      taskId: 'RPM006',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Tony Stark',
      dueDate: '2023-03-11',
    },
    {
      taskId: 'RPM007',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Peter Parker',
      dueDate: '2023-03-11',
    },
    {
      taskId: 'RPM008',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Steve Rogers',
      dueDate: '2023-03-11',
    },
    {
      taskId: 'RPM009',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Natasha Romanoff',
      dueDate: '2023-03-11',
    },
    {
      taskId: 'RPM010',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Review Abnormal Reading',
      taskStatus: 'To Do',
      patient: 'Bruce Banner',
      dueDate: '2023-03-12',
    },
    {
      taskId: 'RPM011',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Diana Prince',
      dueDate: '2023-03-12',
    },
    {
      taskId: 'RPM012',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Barry Allen',
      dueDate: '2023-03-12',
    },
    {
      taskId: 'RPM013',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Hal Jordan',
      dueDate: '2023-03-12',
    },
    {
      taskId: 'RPM014',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Arthur Curry',
      dueDate: '2023-03-13',
    },
    {
      taskId: 'RPM015',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Wanda Maximoff',
      dueDate: '2023-03-13',
    },
    {
      taskId: 'RPM016',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Vision',
      dueDate: '2023-03-13',
    },
    {
      taskId: 'RPM017',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Scott Lang',
      dueDate: '2023-03-13',
    },
    {
      taskId: 'RPM018',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Hope Van Dyne',
      dueDate: '2023-03-13',
    },
    {
      taskId: 'RPM019',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Review Abnormal Reading',
      taskStatus: 'To Do',
      patient: 'Stephen Strange',
      dueDate: '2023-03-14',
    },
    {
      taskId: 'RPM020',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'TChalla',
      dueDate: '2023-03-14',
    },
    {
      taskId: 'RPM021',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Shuri',
      dueDate: '2023-03-14',
    },
    {
      taskId: 'RPM022',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Bucky Barnes',
      dueDate: '2023-03-14',
    },
    {
      taskId: 'RPM023',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Sam Wilson',
      dueDate: '2023-03-14',
    },
    {
      taskId: 'RPM024',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Loki',
      dueDate: '2023-03-15',
    },
    {
      taskId: 'RPM025',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Nick Fury',
      dueDate: '2023-03-15',
    },
    {
      taskId: 'RPM026',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Maria Hill',
      dueDate: '2023-03-15',
    },
    {
      taskId: 'RPM027',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Phil Coulson',
      dueDate: '2023-03-15',
    },
    {
      taskId: 'RPM028',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Peggy Carter',
      dueDate: '2023-03-15',
    },
    {
      taskId: 'RPM029',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Jane Foster',
      dueDate: '2023-03-16',
    },
    {
      taskId: 'RPM030',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Review Abnormal Reading',
      taskStatus: 'To Do',
      patient: 'Thor Odinson',
      dueDate: '2023-03-16',
    },
    {
      taskId: 'RPM031',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Gamora',
      dueDate: '2023-03-16',
    },
    {
      taskId: 'RPM032',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Star Lord',
      dueDate: '2023-03-16',
    },
    {
      taskId: 'RPM033',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Rocket Raccoon',
      dueDate: '2023-03-16',
    },
    {
      taskId: 'RPM034',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Groot',
      dueDate: '2023-03-17',
    },
    {
      taskId: 'RPM035',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Drax',
      dueDate: '2023-03-17',
    },
    {
      taskId: 'RPM036',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Mantis',
      dueDate: '2023-03-17',
    },
    {
      taskId: 'RPM037',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Nebula',
      dueDate: '2023-03-17',
    },
    {
      taskId: 'RPM038',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Yondu',
      dueDate: '2023-03-17',
    },
    {
      taskId: 'RPM039',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Okoye',
      dueDate: '2023-03-18',
    },
    {
      taskId: 'RPM040',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Review Abnormal Reading',
      taskStatus: 'To Do',
      patient: 'Killmonger',
      dueDate: '2023-03-18',
    },
    {
      taskId: 'RPM041',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Hawkeye',
      dueDate: '2023-03-18',
    },
    {
      taskId: 'RPM042',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Kate Bishop',
      dueDate: '2023-03-18',
    },
    {
      taskId: 'RPM043',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Moon Knight',
      dueDate: '2023-03-18',
    },
    {
      taskId: 'RPM044',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'She Hulk',
      dueDate: '2023-03-19',
    },
    {
      taskId: 'RPM045',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Jessica Jones',
      dueDate: '2023-03-19',
    },
    {
      taskId: 'RPM046',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Luke Cage',
      dueDate: '2023-03-19',
    },
    {
      taskId: 'RPM047',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Iron Fist',
      dueDate: '2023-03-19',
    },
    {
      taskId: 'RPM048',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Daredevil',
      dueDate: '2023-03-19',
    },
    {
      taskId: 'RPM049',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Elektra',
      dueDate: '2023-03-20',
    },
    {
      taskId: 'RPM050',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Review Abnormal Reading',
      taskStatus: 'To Do',
      patient: 'Punisher',
      dueDate: '2023-03-20',
    },
    {
      taskId: 'RPM051',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Blade',
      dueDate: '2023-03-20',
    },
    {
      taskId: 'RPM052',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Morbius',
      dueDate: '2023-03-20',
    },
    {
      taskId: 'RPM053',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Deadpool',
      dueDate: '2023-03-21',
    },
    {
      taskId: 'RPM054',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Patient Reminder',
      taskDetails: 'Remind Patient to take reading',
      taskStatus: 'To Do',
      patient: 'Cable',
      dueDate: '2023-03-21',
    },
    {
      taskId: 'RPM055',
      taskPriority: 'Important',
      service: 'RPM',
      taskType: 'Abnormal Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Overdue',
      patient: 'Domino',
      dueDate: '2023-03-21',
    },
    {
      taskId: 'RPM056',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Colossus',
      dueDate: '2023-03-21',
    },
    {
      taskId: 'RPM057',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Negasonic',
      dueDate: '2023-03-21',
    },
    {
      taskId: 'RPM058',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Cyclops',
      dueDate: '2023-03-22',
    },
    {
      taskId: 'RPM059',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'To Do',
      patient: 'Storm',
      dueDate: '2023-03-22',
    },
    {
      taskId: 'RPM060',
      taskPriority: 'Regular',
      service: 'RPM',
      taskType: 'Reading',
      taskDetails: 'Check New Reading',
      taskStatus: 'Completed',
      patient: 'Wolverine',
      dueDate: '2023-03-22',
    },
  ];

  colDef = [
    {
      fieldName: 'taskId',
      headerName: 'Task ID',
      cellRenderer: CommonRendererComponent,
      cellRendererParams: {
        type: 'link',
        onLinkClick: (param: any) => {
          console.log(param.row);
          const task = param.row;
          this.router.navigate(['/dashboard/tasks', task.taskId], {
            state: { task },
          });
        },
      },
    },

    // {
    //   fieldName: 'taskId',
    //   headerName: 'Task ID',
    //   cellRenderer: (params: any) => {
    //     return `<span style="color:#007AFF;cursor:pointer;text-decoration:underline">
    //           ${params.value}
    //         </span>`;
    //   },
    // },

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

  onSelectedRows(rows: any[]) {
    console.log('Selected rows:', rows);
  }
  ngOnInit() {
    this.updatePagedData();
  }

  updatePagedData() {
    const filtered = this.filteredTasks(); //use signal result
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

  //   cellRenderer(params: any) {
  //     if (params.colDef.fieldName === 'taskStatus') {
  //       return  icon`${value}`;
  //     }
  // }
}
