import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { CompanyService } from '../../service-transactions/company/company.service';
import { Observation } from 'src/app/core/interfaces/observation';
import { ObservationComponent } from '../observation/observation.component';
import { FileService } from '../../updown/file.service';
import { ImageHandlerService } from '../../../services/image-handler.service';


@Component({
  selector: 'app-data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.scss']
})
export class DataReviewComponent implements OnInit {

  customerDetails: any = {};
  clientId: any;
  contractAttache: any;
  documents: any = [];
  showModal: boolean = false;

  imageResponse: any;
  imageData: any;
  base64Data: any;

  displayedColumns: string[] = ['position', 'observation', 'delete'];

  datos: Observation[] = [
    new Observation('')
  ];

  dataSource = new MatTableDataSource<Observation>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Observation> | undefined;

  constructor(private activeRoute: ActivatedRoute,
              private companyService: CompanyService,
              private fileService: FileService,
              private imageService: ImageHandlerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      param => {
        this.clientId = param.get('id');
        this.getCustomerData(this.clientId);
      }
    );
    this.getDocuments('4-2021');
  }

  private getCustomerData(clientId: number) {
    this.companyService.findByCustomerId(clientId).subscribe(
      data => {
        let res = data;
        this.customerDetails = res.payload;
      }
    );
  }

  getDocuments(contractId: string){
    this.fileService.findByContractCode(contractId).subscribe(
      (data: any) => {
        this.contractAttache = data.payload;
        this.documents = data.payload.documentDtoList;
        console.log(this.documents);
      }
    );
  }

  showDocument(docName: string): void{
    console.log(docName);
    this.imageService.getImageByName(docName).subscribe(
      (data: any) => {
        //this.imageResponse = data;
        this.base64Data = data;
        console.log(this.base64Data);
        this.imageData = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );

    this.show(docName);
  }

  show(docName: any){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
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
