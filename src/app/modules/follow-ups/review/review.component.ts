import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource} from '@angular/material/table';

import { NoteService } from '../note/note.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../../services/token.service';
import { ContractService } from '../../service-transactions/contract/contract.service';
import { Status } from '../../../core/constants/status';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { INote } from 'src/app/core/interfaces/inote';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  noteStatus: SelectOption[] = Status;
  noteDetails = [];
  tableColumns: string[] = ['position', 'date', 'note', 'contract', 'user', 'subject', 'status'];

  dataTable: INote[] = [];

  dataSource = new MatTableDataSource<INote>(this.dataTable);

  @ViewChild(MatTable) tabla1: MatTable<INote> | undefined;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private contractService: ContractService,
              private noteService: NoteService) { }

  ngOnInit(): void {
    this.onSearch();
  }

  searchForm: FormGroup = this.formBuilder.group({
    contractCode: '',
    noteCode: 0,
    status: 'Pendiente'
  });

  onSearch(){
    let params = new HttpParams();
    params = params.set('contractCode', this.searchForm.get('contractCode')?.value);
    params = params.set('noteCode', this.searchForm.get('noteCode')?.value);
    params = params.set('status', this.searchForm.get('status')?.value);
    
    this.getResultList(params);
  }

  private getResultList(params: HttpParams): void {
    this.noteService.findNoteByParams(params).subscribe(
      (data: any) => {
        this.noteDetails = data.payload;
        console.log(this.noteDetails);
        this.setDataTable();
      }, err => {
        console.log(err);
      }
    );
  }

  private setDataTable() {
    if (this.noteDetails.length > 1) {
      this.noteDetails.map(obj => {
        this.loadDataTable(obj);
      });
    } else {
      this.loadDataTable(this.noteDetails[0]);
    }
  }

  private loadDataTable(noteDetail: any){
    console.log(noteDetail);
    this.dataTable.push({
      position: noteDetail['noteId'],
      date: new Date(),
      noteCode: noteDetail['sequence'],
      contract: noteDetail['contractDto']['contractCode'],
      user: noteDetail['userDto']['fullName'],
      subject: noteDetail['subject'],
      status: noteDetail['status']
    });

    this.dataSource = new MatTableDataSource<INote>(this.dataTable);
    this.tabla1?.renderRows();
  }

}
