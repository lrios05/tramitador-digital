import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  registerForm: FormGroup = this.formBuilder.group(
    {
      nombre: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: [''],
      email: ['', [Validators.required,
              Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
      ]],
      password: ['', [Validators.required, 
              Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)
      ]],
      movil: ['', [Validators.required]]

    }
  )

  onRegister(): void {
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value);
  }

}
