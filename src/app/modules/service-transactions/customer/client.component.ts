import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { sources } from '../../../core/constants/source';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Client } from '../../../models/customer/client';
import { ClientService } from './client.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  identificationSources: SelectOption[] = sources;

  client?: Client;
  
  constructor(private formBuilder: FormBuilder, 
              private tokenService: TokenService,
              private clientService: ClientService) {
   }

  ngOnInit(): void {
  }

  clientForm: FormGroup = this.formBuilder.group({
    'dni': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'originDni': ['', [Validators.required]],
    'name': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'paternal': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'maternal': [''],
    'mobile': ['591-', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'phone': ['', [Validators.pattern(/^[0-9]+$/)]],
    'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    'address': ['', [Validators.required, Validators.pattern(/[A-Za-z0-9 \-\_]+/)]]
  });

  onRegister() {
    this.formToClient();
    let userEmail = this.tokenService.getUserName();

    this.clientService.signup(userEmail!, this.client!).subscribe(
      data => {
        let res: any = data;
        this.tokenService.setCustomer(res.payload.customerId);
      }, err => {
        console.log(err);
      }
    );
  }

  private formToClient(){
    
    this.client = new Client(this.clientForm.get('dni')?.value,
                        this.clientForm.get('originDni')?.value,
                        this.clientForm.get('name')?.value,
                        this.clientForm.get('paternal')?.value,
                        this.clientForm.get('maternal')?.value,
                        this.clientForm.get('mobile')?.value,
                        this.clientForm.get('phone')?.value,
                        this.clientForm.get('email')?.value,
                        this.clientForm.get('address')?.value
                        );
    console.log(this.client);
  }

}
