import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NoteService } from '../note/note.service';
import { DetailService } from '../detail/detail.service';
import { FileService } from '../../updown/file.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  isPreview?: boolean;
  action?: any;
  noteId: any;
  noteHeader: any = {};
  noteDetails: any = [];
  contractAttache: any;
  documents: any = [];

  constructor(private activeRoute: ActivatedRoute, 
              private noteService: NoteService,
              private detailService: DetailService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      param => {
        this.noteId = param.get('id');
        this.action = param.get('action');
      }
    );
    this.setActionButtons(this.action);
    this.getNoteHeader(this.noteId);
  }

  private setActionButtons(action: any) {
    console.log(action);
    if (action === 'PREVIEW') {
      this.isPreview = true;
    } else {
      this.isPreview = false;
    }
  }

  private getNoteHeader(noteId: number): void {
    this.noteService.findByNoteId(noteId).subscribe(
      (data: any) => {
        this.noteHeader = data.payload;
        let contractCode = data.payload.contractPartDto.contractCode;
        console.log(this.noteHeader);
        this.getDocuments(contractCode);
      }
    );
    this.getNoteDetails(noteId);
  }

  private getNoteDetails(noteId: number){
    this.detailService.findDetailByNote(noteId).subscribe(
      (data: any) => {
        this.noteDetails = data.payload;
        console.log(this.noteDetails);
      }
    );
  }

  getDocuments(contractId: string){
    this.fileService.findByContractCode(contractId).subscribe(
      (data: any) => {
        this.contractAttache = data.payload;
        this.documents = data.payload.documentDtoList;
      }
    );
  }

  showDocument(docName: any){
    alert(docName);
  }
}
