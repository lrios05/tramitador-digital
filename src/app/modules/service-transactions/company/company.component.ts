import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TokenService } from '../../../services/token.service';
import { BusinessTypeService } from './../business-type/business-type.service';
import { ActivityGroupService } from '../activity-group/activity-group.service';
import { ActivityService } from '../activity/activity.service';
import { CompanyService } from './company.service';
import { Business } from '../../../models/business/business';
import { BusinessType } from '../../../models/business/business-type';
import { ActivityGroup } from '../../../models/business/activity-group';
import { Activity } from '../../../models/business/activity';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  business?: Business;
  busTypes?: BusinessType[];
  activityGroups?: ActivityGroup[];
  activities?: Activity[];

 
  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private companyService: CompanyService,
              private typeService: BusinessTypeService,
              private activityGroupService: ActivityGroupService,
              private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getBusinessTypeList();
    this.getActivityGroupList();
    this.getActivityList();
  }

  companyForm: FormGroup = this.formBuilder.group({
    'nit': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'typeId': ['', [Validators.required]],
    'name': ['', [Validators.required, Validators.pattern(/[A-Za-z \-\_]+/)]],
    'groupId': ['', [Validators.required]],
    'activityId': ['', [Validators.required]],
    'mobile': ['591-', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    'phone': ['', [Validators.pattern(/^[0-9]+$/)]],
    'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    'address': ['', [Validators.required, Validators.pattern(/[A-Za-z0-9 \-\_]+/)]]
  });


  onRegister() {
    this.formToCompany();
    let customerId = this.tokenService.getCustomer();

    this.companyService.createBusiness(customerId!, this.business!).subscribe(
      data => {
        let res: any = data;
      }, err => {
        console.log(err);
      }
    );
  }

  formToCompany() {
    this.business = new Business(
      this.companyForm.get('nit')?.value,
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

  activityHandler(value: any): void{
    let groupId: number;
    if (value != null) { 
      groupId = value;
      this.loadActivitiesBy(groupId);
    }
  }

  loadActivitiesBy(groupId: number) {
    this.activityService.listActivities(groupId).subscribe(
      data => {
        let res: any = data;
        this.activities = res.payload;
      }
    );
  }

  getBusinessTypeList() {
    this.typeService.listTypes().subscribe(
      data => {
        let res: any = data;
        this.busTypes = res.payload;
      }
    );
  }

  getActivityGroupList() {
    this.activityGroupService.listGroup().subscribe(
      data => {
        let res: any = data;
        this.activityGroups = res.payload;
      }
    );
  }

  getActivityList() {
    this.activityService.listAllActivities().subscribe(
      data => {
        let res: any = data;
        this.activities = res.payload;
      }
    );
  }

}
