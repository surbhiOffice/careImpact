import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  patient: any;
  ngOnInit(): void {
    this.patient = history.state.task;
    console.log(this.patient);
  }
}
