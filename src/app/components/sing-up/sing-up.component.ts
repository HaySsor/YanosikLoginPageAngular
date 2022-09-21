import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  singUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      all: new FormControl(false),
      statute: new FormControl(false, Validators.requiredTrue),
      privacy: new FormControl(false, Validators.requiredTrue),
      marketing: new FormControl(false),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  get email() {
    return this.singUpForm.get('email');
  }
  get password() {
    return this.singUpForm.get('password');
  }
  get confirmPassword() {
    return this.singUpForm.get('confirmPassword');
  }

  submit() {
    if (this.singUpForm.valid) {
      window.alert('Konto utworzone pomyślnie');
      this.router.navigate(['/login']);
      const newUser: {
        email: string;
        password: string | number;
        statute: Boolean;
        privacy: Boolean;
        marketing: Boolean;
      } = {
        email: this.singUpForm.get('email')?.value,
        password: this.singUpForm.get('password')?.value,
        statute: this.singUpForm.get('statute')?.value,
        privacy: this.singUpForm.get('privacy')?.value,
        marketing: this.singUpForm.get('marketing')?.value,
      };
      this.http
        .post('https://jsonplaceholder.typicode.com/posts/', newUser)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
  check() {
    if (this.singUpForm.get('all')?.value) {
      this.singUpForm.get('statute')?.setValue(true);
      this.singUpForm.get('privacy')?.setValue(true);
      this.singUpForm.get('marketing')?.setValue(true);
    } else {
      this.singUpForm.get('statute')?.setValue(false);
      this.singUpForm.get('privacy')?.setValue(false);
      this.singUpForm.get('marketing')?.setValue(false);
    }
  }
}
