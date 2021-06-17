import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { serviceTypes } from '../../../core/constants/contract/service-type';
import { services } from '../../../core/constants/contract/service';
import { wastes } from '../../../core/constants/contract/waste';
import { units } from '../../../core/constants/contract/unit';
import { paymentTypes } from '../../../core/constants/contract/payment-type';
import { payments } from '../../../core/constants/contract/payment';
import { collections } from '../../../core/constants/contract/collection';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  serviceTypeOptions: SelectOption[] = serviceTypes;
  serviceOptions: SelectOption[] = services;
  wasteOptions: SelectOption[] = wastes;
  unitOptions: SelectOption[] = units;
  paymentTypeOptions: SelectOption[] = paymentTypes;
  paymentOptions: SelectOption[] = payments;
  collectionOptions: SelectOption[] = collections;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  contractInfoGroup: FormGroup = this.formBuilder.group({
    'cod_contrato': [''],
    'fecha_registro': ['', [Validators.required]],
    'tipo_servicio': ['', [Validators.required]],
    'id_servicio': ['', [Validators.required]],
    'fecha_inicio': ['', [Validators.required]],
    'fecha_final': ['', [Validators.required]],
    'meses': ['', [Validators.pattern(/^([0-9]){2}$/)]],
    'anios': ['', [Validators.pattern(/^([0-9]){4}$/)]],
    'costo_mes': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'monto_total': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d+)?$/)]],
    'id_forma_pago': ['', [Validators.required]],
    'id_plan_pago': ['', [Validators.required]],
    'id_residuo': ['', [Validators.required]],
    'volumen': ['', [Validators.required, Validators.pattern(/^\d+(?:.\d{2})?$/)]],
    'id_unidad': ['', [Validators.required]],
    'id_plan_recojo': ['', [Validators.required]],
    'dias': ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{2,14}/)]],
    'nro_pagos': ['', [Validators.required, Validators.pattern(/^([0-9]){2}$/)]],
    'observacion': ['']
  });


}
