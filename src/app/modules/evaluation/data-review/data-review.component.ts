import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { ClientService } from '../../service-transactions/customer/client.service';
import { CompanyService } from '../../service-transactions/company/company.service';
import { Observation } from 'src/app/core/interfaces/observation';
import { ObservationComponent } from '../observation/observation.component';


@Component({
  selector: 'app-data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.scss']
})
export class DataReviewComponent implements OnInit {

  customerDetails: any;
  clientId: any;

  displayedColumns: string[] = ['position', 'observation', 'delete'];

  datos: Observation[] = [
    new Observation('Adjuntar documentos contrato firmado')
  ];

  dataSource = new MatTableDataSource<Observation>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Observation> | undefined;

  constructor(private activeRoute: ActivatedRoute,
              private clientService: ClientService, 
              private companyService: CompanyService, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      param => {
        this.clientId = param.get('id');
        this.getCustomerData(this.clientId);
      }
    );
  }

  private getCustomerData(clientId: number) {
    this.companyService.findByCustomerId(clientId).subscribe(
      data => {
        let res = data;
        this.customerDetails = res.payload;
        console.log(this.customerDetails);
      }
    );
  }


  openDialog(){
    const dialogForm = this.dialog.open(ObservationComponent, {
      width: '400px',
      data: new Observation('')
    });

    dialogForm.afterClosed().subscribe(obs => {
      if (obs != undefined) {
        this.addObservation(obs);
      }
    });
  }

  addObservation(obs: Observation) {
    console.log(obs.observation);
    this.datos.push(new Observation(obs.observation));
    this.tabla1?.renderRows();
  }

  deleteObservation(cod: number) {
    //if (confirm("Desea quitar la observación?")) {
      this.datos.splice(cod, 1);
      this.tabla1?.renderRows();
    //}
  }

}
