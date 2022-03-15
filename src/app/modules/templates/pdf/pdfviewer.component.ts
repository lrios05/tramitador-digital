import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { TokenService } from '../../../services/token.service';
import { PdfmanagerService } from './pdfmanager.service';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.scss']
})
export class PdfviewerComponent implements OnInit {

  contractId?: any;

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;

  constructor(private tokenService: TokenService,
              private pdfManager: PdfmanagerService) { }

  ngOnInit(): void {
    this.contractId = this.tokenService.getContract();
    this.contractId = 3;
    this.generatePdfTemplate();
  }

  generatePdfTemplate(){
    this.pdfManager.createPdfTemplate(this.contractId!).subscribe(
      (response) => {
        let file = new Blob([response], { type: 'application/pdf' });
        console.log(file.text.name)
        var fileURL = URL.createObjectURL(file);
        this.pdfViewer.nativeElement.data = fileURL;
      }
    );
  }

}
