import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ClientComponent } from './customer/client.component';
import { CompanyComponent } from '../../modules/service-transactions/company/company.component';
import { ContractComponent } from '../../modules/service-transactions/contract/contract.component';

const CLIENT_INDEX: number = 0;
const COMPANY_INDEX: number = 1;
const CONTRACT_INDEX: number = 2;
const FINAL_INDEX: number = 3;

@Component({
  selector: 'app-service-transactions',
  templateUrl: './service-transactions.component.html',
  styleUrls: ['./service-transactions.component.scss']
})
export class ServiceTransactionsComponent implements OnInit, AfterViewInit, OnDestroy {

  errorMessages: string[] = [];
  currentStepIndex: number = 0;
  clientSubscription!: Subscription;
  formSubmitted: boolean = false;
  allFormsValid: boolean = false;
  dataLoading: boolean = false;

  @ViewChild(ClientComponent) client!: ClientComponent;
  @ViewChild(CompanyComponent) company!: CompanyComponent;
  @ViewChild(ContractComponent) contract!: ContractComponent;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.manageClientSubscription();
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  private manageClientSubscription() {
    this.clientSubscription = this.client
      .clientForm
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((values) => {
          this.manageClientCheck();
        }
      );
  }

  private manageClientCheck() {
    if (this.currentStepIndex == CLIENT_INDEX) {
      if (this.client.clientForm.valid) {
        this.clearIconError(CLIENT_INDEX);
      }
    }
  }

  private clearIconError(index: number){
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  private getIconElementByIndex(index: number): HTMLElement {
    let nodeList: NodeList = document.querySelectorAll('.mat-step-icon');
    let node: Node | null = nodeList.item(index);

    return (<HTMLElement>node);
  }


  onStepChange(event: any) {
    let previousIndex: number = event.previouslySelectedIndex;
    let currenIndex: number = event.selectedIndex;

    this.currentStepIndex = currenIndex;

    if (previousIndex == CLIENT_INDEX) {
      // TODO populate client object

      //let validForm: boolean = (this.client.clientInfoGroup.valid);
      let validForm: boolean = true;

      if (!validForm) {
        this.changeIcon(previousIndex);
        this.allFormsValid = false;
      } else {
        this.clearIconError(previousIndex);
        this.allFormsValid = true;
      }

    } else if (previousIndex == COMPANY_INDEX) {
      // TODO populate Company object
    } else if (previousIndex == CONTRACT_INDEX) {
      // TODO populate Contract object
    }

    if (currenIndex == FINAL_INDEX) {
      this.validateForms();
    }
  }

  private changeIcon(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.add('mat-step-icon-invalid');
  }

  private validateForms() {
    this.errorMessages = [];

    this.validateClientForm();
  }

  private validateClientForm() {
    let clientForm: FormGroup = this.client.clientForm;

    Object.keys(clientForm.controls).forEach(key => {
      const controlErrors: any = clientForm.get(key)?.errors as ValidationErrors;

      if (controlErrors != null) {
        this.addErrorByKey(key);
      }
    });
  }

  private addErrorByKey(key: string) {
    if (key == 'nombre') this.errorMessages.push("Ingrese un nombre válido");
    if (key == 'ap_paterno') this.errorMessages.push("Ingrese un apellido válido");
    if (key == 'email') this.errorMessages.push("Ingrese un correo electrónico válido");
    if (key == 'direccion') this.errorMessages.push("Ingrese una dirección válida");
  }

  saveForm(){
    this.formSubmitted = true;

    console.log('Todos los campos son recogidos en una clase Client');
    this.createClient()
  }

  private createClient() {
    // TODO call serviceClient to save data
    console.log('Saving client data');
  }

}
