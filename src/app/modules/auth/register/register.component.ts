import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models/user/user';
import { AuthService } from '../auth.service';
import { TokenService } from '../../../services/token.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  user: User | undefined;
  isLogged: boolean = false;
  errorMsg: string = '';

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private authService: AuthService,
              private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  registerForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      paternal: ['', [Validators.required]],
      maternal: [''],
      email: ['', [Validators.required,
              Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
      ]],
      password: ['', [Validators.required, 
              Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)
      ]]
    }
  )

  onRegister(): void {
    if (this.registerForm.valid) {
      this.formToUser();
      this.authService.signup(this.user!).subscribe(
        data => {
          this.router.navigate(['/login']);
        }, 
        err => {
          console.error();
        }
      )
    }
    return;
    console.log(this.registerForm.value);
  }

  private formToUser(){
    this.user = new User(this.registerForm.get('email')?.value,
                        this.registerForm.get('password')?.value,
                        this.registerForm.get('name')?.value,
                        this.registerForm.get('paternal')?.value,
                        this.registerForm.get('maternal')?.value
                        );
  }

}
