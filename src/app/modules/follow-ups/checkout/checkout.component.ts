import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { NoteService } from '../note/note.service';
import { DetailService } from '../detail/detail.service';
import { FileService } from '../../updown/file.service';
import { ImageHandlerService } from '../../../services/image-handler.service';

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
  showModal?: boolean;
  contractCode?: string;
  imageData: any;
  base64Data: any;

  constructor(private activeRoute: ActivatedRoute, 
              private noteService: NoteService,
              private detailService: DetailService,
              private fileService: FileService,
              private imageService: ImageHandlerService) { }

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
        this.contractCode = data.payload.contractPartDto.contractCode;
        this.getDocuments(this.contractCode!);
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
    let httpParams = new HttpParams();
    httpParams = httpParams.set('code', this.contractCode!);
    httpParams = httpParams.set('filename', docName);

    this.showModal = true;

    this.imageService.getImageByContract(httpParams).subscribe(
      (data: any) => {
        this.imageData = data;
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  show(docName: any){
    this.showModal = true;
 
    this.imageService.getImageByName(docName).subscribe(
      (data: any) => {
        this.imageData = data;
      }, (error: any) => {
        console.log(error);
      }
    );

  }

  hide(){
    this.showModal = false;
  }
}
