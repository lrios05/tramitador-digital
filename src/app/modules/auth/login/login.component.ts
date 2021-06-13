import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

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
  }

}
