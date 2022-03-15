import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Client } from '../../../models/customer/client';
import { ClientService } from './client.service';
import { TokenService } from '../../../services/token.service';
import { CityService } from '../../service-transactions/city/city.service';
import { DniCity } from '../../../models/customer/dni-city';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client?: Client;
  cities?: DniCity[];
  confirmationChecked: boolean = false;
  
  constructor(private formBuilder: FormBuilder, 
              private tokenService: TokenService,
              private clientService: ClientService,
              private cityService: CityService) {
   }

  ngOnInit(): void {
    this.loadDniCities();
  }

  clientForm: FormGroup = this.formBuilder.group({
    'dni': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'originDni': ['', [Validators.required]],
    'name': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'paternal': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'maternal': [''],
    'mobile': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'phone': ['', [Validators.pattern(/^[0-9]+$/)]],
    'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    'address': ['', [Validators.required, Validators.pattern(/[A-Za-z0-9 \-\_]+/)]],
    'confirmation': [false, Validators.requiredTrue]
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

  private loadDniCities() {
    this.cityService.listCities().subscribe(
      data => {
        let res: any = data;
        this.cities = res.payload;
      }
    );
  }

  isChecked(ev: any) {
    if (ev.checked) {
      this.confirmationChecked = true;
    } else {
      this.confirmationChecked = false;
    }
  }

}
