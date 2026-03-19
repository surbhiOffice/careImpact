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
  timeInput: number = 0;
  isFormValid: boolean = false;
  progress: number = 0;
  remainingTime: string = '20:00'; 
  maxMinutes = 20;
  
checkForm() {
  this.isFormValid =
    this.hcpNote.trim().length > 0 &&
    this.timeInput > 0;
}


onTimeChange() {
  let minutes = this.timeInput || 0;

  // Clamp value
  if (minutes < 0) minutes = 0;
  if (minutes > this.maxMinutes) minutes = this.maxMinutes;

  this.timeInput = minutes;

  // Progress %
  this.progress = (minutes / this.maxMinutes) * 100;

  // Remaining time
  const remainingMinutes = this.maxMinutes - minutes;
  const mins = Math.floor(remainingMinutes);
  const secs = Math.floor((remainingMinutes - mins) * 60);

  this.remainingTime =
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Validate form AFTER updating values
  this.checkForm();
}

completeTask() {
  // const minutes = this.timeInput || 0;

  // // Progress fill now
  // this.progress = (minutes / this.maxMinutes) * 100;

  console.log('Task Completed');
}

}
