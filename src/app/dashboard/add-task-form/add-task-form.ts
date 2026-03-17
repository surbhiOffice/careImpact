import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../snack-bar-comp/snackBarService';
import { DashboardService, NewPatient, Patient } from '../dashboard-service';

@Component({
  selector: 'app-add-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-form.html',
  styleUrl: './add-task-form.scss',
})
export class AddTaskForm {
  @Input() patientData?: Patient;
  @Output() closed = new EventEmitter<void>();

  taskForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackBar: SnackbarService,
  ) {
    this.taskForm = this.fb.group({
      patient: ['', Validators.required],
      taskPriority: ['', Validators.required],
      service: ['', Validators.required],
      taskDetails: ['', Validators.required],
      taskStatus: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  close() {
    this.closed.emit();
    if (!this.patientData) {
      this.router.navigate(['/dashboard/tasks']);
    }
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;

      // ALWAYS ADD
      this.dashboardService.addPatient(formData as NewPatient);
      console.log(formData.patient);

      this.snackBar.open({
        title: 'Task Added',
        toastData: `${formData.patient} added successfully`,
        type: 'success',
      });

      this.closed.emit();
    } else {
      this.snackBar.open({
        toastData: 'Please fill in all required fields',
        type: 'warning',
      });
    }
  }
}
