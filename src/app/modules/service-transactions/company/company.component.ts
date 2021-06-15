import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { activities } from '../../../core/constants/activity';
import { rubros } from '../../../core/constants/rubro';
import { societies } from '../../../core/constants/society';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  typeSocieties: SelectOption[] = societies;
  tipoRubros: SelectOption[] = rubros;
  typeActivities: SelectOption[] = activities;
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  companyInfoGroup: FormGroup = this.formBuilder.group({
    'nit': ['', [Validators.required, Validators.pattern('/^\d{8}(?:[-\s]\d{4})?$/')]],
    'sociedad': ['', [Validators.required]],
    'nom_actividad': ['', [Validators.required, Validators.pattern('/[A-Za-z \-\_]+/')]],
    'actividad': ['', [Validators.required]],
    'celular': ['', [Validators.required, Validators.pattern('/^\d{8}(?:[-\s]\d{4})?$/')]],
    'telefono': ['', [Validators.pattern('/^\d{8}(?:[-\s]\d{4})?$/')]],
    'email': ['', [Validators.required, Validators.pattern('/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/')]],
    'direccion': ['', [Validators.required, Validators.pattern('/[A-Za-z0-9 \-\_]+/')]],
    'observacion': ['']
  });

}
