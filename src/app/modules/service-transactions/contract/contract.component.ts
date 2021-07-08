import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PaymentTypeService } from '../payment-type/payment-type.service';
import { PaymentFrequencyService } from '../payment-frequency/payment-frequency.service';
import { GatherFrequencyService } from '../gather-frequency/gather-frequency.service';
import { WasteTypeService } from '../waste-type/waste-type.service';
import { UnitService } from '../unit/unit.service';
import { ServiceTypeService } from '../service-type/service-type.service';
import { ServiceOfferService } from '../service-offer/service-offer.service';
import { ContractService } from '../contract/contract.service';
import { TokenService } from '../../../services/token.service';

import { Contract } from '../../../models/contract/contract';
import { ServiceType } from '../../../models/service-offer/service-type';
import { ServiceOffer } from '../../../models/service-offer/service-offer';
import { PaymentType } from '../../../models/contract/payment-type';
import { PaymentFrequency } from '../../../models/contract/payment-frequency';
import { GatherFrequency } from '../../../models/contract/gather-frequency';
import { Unit } from '../../../models/contract/unit';
import { WasteType } from '../../../models/contract/waste-type';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contract?: Contract;
  serviceTypes?: ServiceType[];
  serviceOffer?: ServiceOffer[];
  paymentTypes?: PaymentType[];
  paymentFrequencies?: PaymentFrequency[];
  gatherFrequencies?: GatherFrequency[];
  units?: Unit[];
  wasteTypes?: WasteType[];


  constructor(private formBuilder: FormBuilder,
              private serviceTypeService: ServiceTypeService,
              private serviceOfferService: ServiceOfferService,
              private paymentTypeService: PaymentTypeService,
              private paymenFrequencyService: PaymentFrequencyService,
              private gatherFrequencyService: GatherFrequencyService,
              private wasteTypeService: WasteTypeService,
              private unitService: UnitService,
              private contractService: ContractService,
              private tokenService: TokenService) { }
              
  ngOnInit(): void {
    this.getServiceTypeList();
    this.getServiceOfferList();
    this.getPaymentTypeList();
    this.getPaymentFrequencyList();
    this.getGatherFrequencyList();
    this.getWasteTypeList();
    this.getUnitList();
  }

  contractForm: FormGroup = this.formBuilder.group({
    'serviceTypeId': ['', [Validators.required]],
    'serviceId': ['', [Validators.required]],
    'initDate': ['', [Validators.required]],
    'endDate': ['', [Validators.required]],
    'months': ['', [Validators.pattern(/^([0-9]){2}$/)]],
    'years': ['', [Validators.pattern(/^([0-9]){4}$/)]],
    'monthCost': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'totalCost': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'payTypeId': ['', [Validators.required]],
    'paymentId': ['', [Validators.required]],
    'wasteId': ['', [Validators.required]],
    'volume': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d{2})?$/)]],
    'unitId': ['', [Validators.required]],
    'gatherId': ['', [Validators.required]],
    'days': ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{2,14}/)]],
    'payments': ['', [Validators.required, Validators.pattern(/^([0-9]){2}$/)]],
    'obs': ['']
  });

  onRegister(){
    this.formToContract();
    let customerId = this.tokenService.getCustomer();

    this.contractService.createContract(customerId!, this.contract!).subscribe(
      data => {
        let res: any = data;
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

  formToContract(){
    this.contract = new Contract(
      this.contractForm.get('initDate')?.value,
      this.contractForm.get('endDate')?.value,
      this.contractForm.get('serviceId')?.value,
      this.contractForm.get('totalCost')?.value,
      this.contractForm.get('payTypeId')?.value,
      this.contractForm.get('paymentId')?.value,
      this.contractForm.get('payments')?.value,
      this.contractForm.get('amount')?.value,
      this.contractForm.get('gatherId')?.value,
      this.contractForm.get('wasteId')?.value,
      this.contractForm.get('volume')?.value,
      this.contractForm.get('unitId')?.value,
      this.contractForm.get('days')?.value,
      this.contractForm.get('obs')?.value
    );
  }

  serviceTypeHandler(value: any): void{
    let serviceTypeId: number;
    if (value != null) { 
      serviceTypeId = value;
      this.loadServicesBy(serviceTypeId);
    }
  }

  loadServicesBy(serviceTypeId: number) {
    this.serviceOfferService.listServices(serviceTypeId).subscribe(
      data => {
        let res: any = data;
        this.serviceOffer = res.payload;
        console.log(this.serviceOffer);
      }
    );
  }


  getServiceTypeList() {
    this.serviceTypeService.listTypes().subscribe(
      data => {
        let res: any = data;
        this.serviceTypes = res.payload;
      }
    );
  }

  getServiceOfferList() {
    this.serviceOfferService.listAllServices().subscribe(
      data => {
        let res: any = data;
        this.serviceOffer = res.payload;
      }
    );
  }

  getPaymentTypeList() {
    this.paymentTypeService.listTypes().subscribe(
      data => {
        let res: any = data;
        this.paymentTypes = res.payload;
      }
    );
  }

  getPaymentFrequencyList() {
    this.paymenFrequencyService.listPaymentFrequencies().subscribe(
      data => {
        let res: any = data;
        this.paymentFrequencies = res.payload;
      }
    );
  }

  getGatherFrequencyList() {
    this.gatherFrequencyService.listGatherFrequencies().subscribe(
      data => {
        let res: any = data;
        this.gatherFrequencies = res.payload;
      }
    );
  }

  getWasteTypeList() {
    this.wasteTypeService.listWaste().subscribe(
      data => {
        let res: any = data;
        this.wasteTypes = res.payload;
      }
    );
  }

  getUnitList() {
    this.unitService.listUnits().subscribe(
      data => {
        let res: any = data;
        this.units = res.payload;
      }
    );
  }

}
