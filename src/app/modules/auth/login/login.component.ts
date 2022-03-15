import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from '../../../models/auth/user-login';
import { AuthService } from '../auth.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  isLogged: boolean = false;
  isLoginFail: boolean = false;

  userLogin: UserLogin | undefined;
  userName: string | undefined;
  password: string | undefined;
  roles: string[] = [];
  errorMsg: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  loginForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
      ]],
      password: ['', [Validators.required]]
    }
    //Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/)
  )

  onLogin(): void {
    this.userName = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;

    this.userLogin = new UserLogin(this.userName!, this.password!);
    this.authService.login(this.userLogin).subscribe(
      data => {
        let dataJwtDto: any = data;
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(dataJwtDto.payload.token);
        this.tokenService.setUserName(dataJwtDto.payload.userName);
        this.tokenService.setAuthorities(dataJwtDto.payload.authorities);
        this.roles = dataJwtDto.payload.authorities;

        this.validateForm();
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err;
      }
    );

    this.authService.findUser(this.loginForm.get('email')?.value).subscribe(
      data => {
        let dataUser: any = data;
        this.tokenService.setUserFullName(dataUser.payload.fullName);
      }
    );

  }

  validateForm() {
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
