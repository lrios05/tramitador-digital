import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ClientComponent } from '../../modules/service-transactions/client/client.component';

const CLIENT_INDEX: number = 0;
const COMPANY_INDEX: number = 1;
const CONTRACT_INDEX: number = 2;


@Component({
  selector: 'app-service-transactions',
  templateUrl: './service-transactions.component.html',
  styleUrls: ['./service-transactions.component.scss']
})
export class ServiceTransactionsComponent implements OnInit, AfterViewInit, OnDestroy {

  currentStepIndex: number = 0;
  clientSubscription!: Subscription;
  formSubmited: boolean = false;
  allFormsValid: boolean = false;
  dataLoading: boolean = false;

  @ViewChild(ClientComponent) client!: ClientComponent;

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
      .clientInfoGroup
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
      if (this.client.clientInfoGroup.valid) {
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


}
