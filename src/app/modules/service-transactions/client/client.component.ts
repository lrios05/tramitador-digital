import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { sources } from '../../../core/constants/source';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  identificationSources: SelectOption[] = sources;

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
  }

  clientInfoGroup: FormGroup = this.formBuilder.group({
    'ci': ['', [Validators.required, Validators.pattern(/^\d{6}(?:[-\s]\d{4})?$/)]],
    'origen_ci': ['', [Validators.required]],
    'nombre': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'ap_paterno': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'ap_materno': [''],
    'celular': ['', [Validators.required, Validators.pattern(/^\d{7}(?:[-\s]\d{4})?$/)]],
    'telefono': ['', [Validators.pattern(/^\d{7}(?:[-\s]\d{4})?$/)]],
    'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    'direccion': ['', [Validators.required, Validators.pattern(/[A-Za-z0-9 \-\_]+/)]]
  });

}
