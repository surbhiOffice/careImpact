import { Component, Signal } from '@angular/core';
import { PatientService } from './patient-service';
import { CatsDataGridComponent } from 'cats-data-grid';

@Component({
  selector: 'app-patient-component',
  imports: [CatsDataGridComponent],
  templateUrl: './patient-component.html',
  styleUrl: './patient-component.scss',
})
export class PatientComponent {
  patient!: Signal<any[]>;
  constructor(private patientService: PatientService) {
    this.patient = this.patientService.patients;
  }

  colDef = [
    { fieldName: 'patientId', headerName: 'Patient Id' },
    { fieldName: 'patientName', headerName: 'Patient Name' },
    { fieldName: 'practiceName', headerName: 'Practice Name' },
    { fieldName: 'service', headerName: 'Service' },
    { fieldName: 'lastNoteRecorded', headerName: 'Last Note Recorded' },
  ];
}
