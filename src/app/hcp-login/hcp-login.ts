import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent, InputConfig } from 'cats-ui-lib';

@Component({
  selector: 'app-hcp-login',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './hcp-login.html',
  styleUrl: './hcp-login.scss',
})
export class HcpLogin {
  loginForm!: FormGroup
  constructor(private router: Router, private fb: FormBuilder) {
  this.loginForm = this.fb.group({
    userName: ['',[Validators.required, Validators.minLength(3),Validators.pattern(/^[a-z]+( [a-z]+)*$/)]],
    password: ['',[Validators.required ,       Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        ),]]
  })
  }

  users = [{
    userName: 'surbhi', password: 'Milly@123'
  },
  {
    userName: 'sunmeet', password: 'Sunmeet@123'
  }]

login() {
  const { userName, password } = this.loginForm.value;

  const user = this.users.find(
    u => u.userName === userName && u.password === password
  );

  if (user) {
    alert('Login successful!');
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/dashboard']); 
  } else {
    alert('Invalid username or password. Please try again.');
  }
}
  logout() {
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    this.router.navigate(['/hcp-login']);
  }

  inputConfigText: InputConfig = {
    type: 'text',
    placeholder: 'Enter value',
  };

}
