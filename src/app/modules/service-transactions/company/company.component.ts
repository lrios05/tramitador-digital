import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TokenService } from '../../../services/token.service';
import { CompanyService } from './company.service';
import { activities } from '../../../core/constants/activity';
import { rubros } from '../../../core/constants/rubro';
import { societies } from '../../../core/constants/society';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Business } from 'src/app/models/business/business';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  typeSocieties: SelectOption[] = societies;
  tipoRubros: SelectOption[] = rubros;
  typeActivities: SelectOption[] = activities;

  business?: Business;
 
  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  companyForm: FormGroup = this.formBuilder.group({
    'nit': ['', [Validators.required, Validators.pattern(/^\d{7}(?:[-\s]\d{4})?$/)]],
    'typeId': ['', [Validators.required]],
    'name': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'groupID': ['', [Validators.required]],
    'activityId': ['', [Validators.required]],
    'mobile': ['591-', [Validators.required, Validators.pattern(/^\d{3}(?:[-\s]\d{8})?$/)]],
    'phone': ['', [Validators.pattern(/^\d{7}(?:[-\s]\d{4})?$/)]],
    'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    'address': ['', [Validators.required, Validators.pattern(/[A-Za-z0-9 \-\_]+/)]]
  });


  onRegister() {
    this.formToCompany();
    let customerId = this.tokenService.getCustomer();

    this.companyService.createBusiness(customerId!, this.business!).subscribe(
      data => {
        let res: any = data;
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

  formToCompany() {
    this.business = new Business(
      this.companyForm.get('dni')?.value,
      this.companyForm.get('name')?.value,
      this.companyForm.get('mobile')?.value,
      this.companyForm.get('phone')?.value,
      this.companyForm.get('email')?.value,
      this.companyForm.get('website')?.value,
      this.companyForm.get('address')?.value,
      this.companyForm.get('typeId')?.value,
      this.companyForm.get('activityId')?.value
     );
  }
}
