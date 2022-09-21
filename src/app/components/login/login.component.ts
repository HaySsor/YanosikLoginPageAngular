import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (this.loginForm.valid) {
      const user: {
        email: string;
        password: string | number;
      } = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      window.alert('Zalogowano !');
      this.http
        .post('https://jsonplaceholder.typicode.com/posts/', user)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
