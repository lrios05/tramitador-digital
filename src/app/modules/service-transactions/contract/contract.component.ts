import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PaymentTypeService } from '../payment-type/payment-type.service';
import { PaymentFrequencyService } from '../payment-frequency/payment-frequency.service';
import { GatherFrequencyService } from '../gather-frequency/gather-frequency.service';
import { WasteTypeService } from '../waste-type/waste-type.service';
import { UnitService } from '../unit/unit.service';
import { ServiceTypeService } from '../service-type/service-type.service';
import { ServiceOfferService } from '../service-offer/service-offer.service';
import { ContractService } from '../contract/contract.service';
import { TokenService } from '../../../services/token.service';
import { DateTimeService } from '../../../services/date-time.service';

import { Contract } from '../../../models/contract/contract';
import { ServiceType } from '../../../models/service-offer/service-type';
import { ServiceOffer } from '../../../models/service-offer/service-offer';
import { PaymentType } from '../../../models/contract/payment-type';
import { PaymentFrequency } from '../../../models/contract/payment-frequency';
import { GatherFrequency } from '../../../models/contract/gather-frequency';
import { Unit } from '../../../models/contract/unit';
import { WasteType } from '../../../models/contract/waste-type';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as _moment from 'moment';

const momento = _moment;


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
  payments: number = 0;
  amount: number = 0.0;
  fecha?: FormControl;


  constructor(private formBuilder: FormBuilder,
    private serviceTypeService: ServiceTypeService,
    private serviceOfferService: ServiceOfferService,
    private paymentTypeService: PaymentTypeService,
    private paymenFrequencyService: PaymentFrequencyService,
    private gatherFrequencyService: GatherFrequencyService,
    private wasteTypeService: WasteTypeService,
    private unitService: UnitService,
    private contractService: ContractService,
    private tokenService: TokenService,
    private dateService: DateTimeService) { }

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
    'years': ['', [Validators.pattern(/^([0-9]){1}$/)]],
    'monthCost': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'totalCost': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'payTypeId': ['', [Validators.required]],
    'paymentId': ['', [Validators.required]],
    'wasteId': ['', [Validators.required]],
    'volume': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d{2})?$/)]],
    'unitId': ['', [Validators.required]],
    'gatherId': ['', [Validators.required]],
    'confirmation': [false, Validators.requiredTrue]
  });
  //'days': ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{2,14}/)]]

  onRegister() {
    this.formToContract();
    console.log(this.contract);
    let customerId = this.tokenService.getCustomer();

    this.contractService.createContract(customerId!, this.contract!).subscribe(
      data => {
        let res: any = data;
        console.log(res);
        this.tokenService.setContract(res.payload.contractId);
      }, err => {
        console.log(err);
      }
    );
  }

  formToContract() {
    this.getPaymentsNumber();

    this.contract = new Contract(
      this.contractForm.get('initDate')?.value,
      this.contractForm.get('endDate')?.value,
      this.contractForm.get('serviceId')?.value,
      this.contractForm.get('totalCost')?.value,
      this.contractForm.get('payTypeId')?.value,
      this.contractForm.get('paymentId')?.value,
      this.payments,
      this.amount,
      this.contractForm.get('gatherId')?.value,
      this.contractForm.get('wasteId')?.value,
      this.contractForm.get('volume')?.value,
      this.contractForm.get('unitId')?.value,
      this.contractForm.get('days')?.value
    );
  }

  serviceTypeHandler(value: any): void {
    let serviceTypeId: number;
    if (value != null) {
      serviceTypeId = value;
      this.loadServicesBy(serviceTypeId);
    }
  }

  private loadServicesBy(serviceTypeId: number) {
    this.serviceOfferService.listServices(serviceTypeId).subscribe(
      data => {
        let res: any = data;
        this.serviceOffer = res.payload;
        console.log(this.serviceOffer);
      }
    );
  }

  serviceOfferHandler(value: any): void {
    let serviceId: number;
    if (value != null) {
      serviceId = value;
      this.setServicePrices(serviceId);
    }
  }

  private setServicePrices(serviceId: number) {
    if (serviceId != null) {
      let servicePrice: any = this.serviceOffer?.find(element => element.serviceId = serviceId);
      let months: number = this.contractForm.get('months')?.value;
      let totalPrice = servicePrice?.price * months;

      this.contractForm.patchValue({
        monthCost: servicePrice?.price,
        totalCost: totalPrice
      });
    }
  }

  setTotalCost(event: any): void {
    if (event != null) {
      let months: number = this.contractForm.get('months')?.value;
      let pricePerMonth = this.contractForm.get('monthCost')?.value;
      let totalPrice = pricePerMonth * months;
  
      this.contractForm.patchValue({
        totalCost: totalPrice
      });
    }
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

  getPaymentsNumber() {
    let index = this.contractForm.get('paymentId')?.value;
    let totalCost = this.contractForm.get('totalCost')?.value;

    let data: any = this.paymentFrequencies?.forEach(item => {
      return (item.paymentId == index) ? item.frequency : '';
    });

    if (data == 'Mensual') {
      this.payments = 12;
    } else if (data == 'Trimestral') {
      this.payments = 4;
    } else if (data == 'Semestral') {
      this.payments = 2;
    } else {
      this.payments = 1;
    }

    this.amount = totalCost / this.payments;
  }

  // Date operations
  dateEventHandler(event: MatDatepickerInputEvent<Date>) {
    this.dateService.getFormatDate(event.value!);
    let dmyDate = this.dateService.getFinalDate(event.value!);

    this.contractForm.patchValue(
      {
        endDate: new Date(dmyDate[2], dmyDate[1] - 1, dmyDate[0])
      }
    );
  }

  setTotalMonths() {
    let initDate = this.contractForm.get('initDate')?.value;
    let endDate = this.contractForm.get('endDate')?.value;
    let totalMonths = this.dateService.getTotalMonths(initDate, endDate);

    this.contractForm.patchValue(
      { months: totalMonths }
    )
  }

  setTotalYears() {
    let months = this.contractForm.get('months')?.value;
    let totalYears = this.dateService.getTotalYears(months);

    this.contractForm.patchValue(
      { years: totalYears }
    )
  }

}
