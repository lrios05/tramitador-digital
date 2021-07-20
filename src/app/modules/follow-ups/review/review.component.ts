import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NoteService } from '../note/note.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../../services/token.service';
import { ContractService } from '../../service-transactions/contract/contract.service';
import { Status } from '../../../core/constants/status';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { INote } from 'src/app/core/interfaces/inote';


const FOLLOWUP_DATA: INote[] = [
  {position: 1, date: '01/07/2021', note: 1, contract: '1001-2021', customer: 'Restaurant El Pollo Gordo', subject: 'Solicitud de aprobación de Contrato', status: 'Pendiente'},
  {position: 2, date: '03/07/2021', note: 2, contract: '1003-2021', customer: 'Clínica de los heridos', subject: 'Solicitud de aprobación de Contrato', status: 'Pendiente'},
  {position: 3, date: '01/07/2021', note: 3, contract: '1001-2021', customer: 'Restaurant El Pollo Gordo', subject: 'Solicitud de aprobación de Contrato', status: 'Aprobado'}
];

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  noteStatus: SelectOption[] = Status;
  noteDetails = [];
  tableColumns: string[] = ['position', 'date', 'note', 'contract', 'customer', 'subject', 'status'];
  dataSource = FOLLOWUP_DATA;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private contractService: ContractService,
              private noteService: NoteService) { }

  ngOnInit(): void {
  }

  searchForm: FormGroup = this.formBuilder.group({
    contractCode: '',
    noteCode: '',
    status: ''
  });

  onSearch(){
    let params = new HttpParams();
    params = params.set('contractCode', this.searchForm.get('contractCode')?.value);
    params = params.set('noteCode', this.searchForm.get('noteCode')?.value);
    params = params.set('status', this.searchForm.get('status')?.value);
    
    this.noteService.findNoteByParams(params).subscribe(
      data => {
        let res: any = data;
        this.noteDetails = res.payload;
        console.log(this.noteDetails);
      }, err => {
        console.log(err);
      }
    );
  }

}
