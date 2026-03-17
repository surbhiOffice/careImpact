import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  imports: [FormsModule,],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  patient: any;
  ngOnInit(): void {
    this.patient = history.state.task;
    console.log(this.patient);
  }
  hcpNote: string = '';
  timeInput: string = '';
  isFormValid: boolean = false;
  progress: number = 0;
  remainingTime: string = '20:00'; 
  maxMinutes = 20;
  
  checkForm() {
    this.isFormValid = this.hcpNote.trim().length > 0 && this.timeInput.trim().length > 0;
  }


onTimeChange() {
  this.checkForm();
  let minutes = Number(this.timeInput) || 0;
  // Apply min/max validation
  if (minutes < 0) minutes = 0;
  if (minutes > 20) minutes = 20;

  this.timeInput = minutes.toString();

  // Progress %
  this.progress = Math.min((minutes / this.maxMinutes) * 100, 100);

  // Remaining time
  const remainingMinutes = Math.max(this.maxMinutes - minutes, 0);
  const mins = Math.floor(remainingMinutes);
  const secs = Math.round((remainingMinutes - mins) * 60);

}

}
