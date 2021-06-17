import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required,
              Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
      ]],
      password: ['', [Validators.required, 
              Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)
      ]]
    }
  )

  onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/customer');
  }

  /*
  authenticateUser(): void {
    console.log(this.loginForm);
    this.router.navigateByUrl('/customer');
  }
*/

  goRegisterForm(): void {
    this.router.navigateByUrl('/register');
  }

}
