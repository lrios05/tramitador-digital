import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../auth/auth.service';
import { RoleUser } from '../../../models/user/role-user';
import { ContractService } from '../../service-transactions/contract/contract.service';
import { ApisignatureService } from '../apisignature.service';
import { SignatureInfo } from '../../../models/signature/signature-info';

@Component({
  selector: 'app-apisignature',
  templateUrl: './apisignature.component.html',
  styleUrls: ['./apisignature.component.scss']
})
export class ApisignatureComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  userId?: number;
  fileInfos?: Observable<any>;
  signatureInfo?: SignatureInfo;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contractService: ContractService,
    private tokenService: TokenService,
    private signatureService: ApisignatureService) { }

  ngOnInit(): void {
    //this.fileInfos = this.signatureService.getFiles();
    let userEmail = this.tokenService.getUserName();
    this.getUserIdByEmail(userEmail!);
    //let contractId = this.tokenService.getContract();
    this.getContractById(2);
  }

  signatureForm: FormGroup = this.formBuilder.group({
    'userId': ['', [Validators.required]],
    'userName': ['', [Validators.required]],
    'contractId': ['', [Validators.required]],
    'contractCode': ['', [Validators.required]],
    'document': ['', [Validators.required]] 
  });

  private getUserIdByEmail(userEmail: string): void {
    this.authService.findUser(userEmail).subscribe(
      (data: any) => {
        console.log(data.payload);
        this.userId = data.payload.userId;
        let userName = data.payload.fullName;
        this.signatureForm.get('userId')?.setValue(this.userId);
        this.signatureForm.get('userName')?.setValue(userName);
      }
    );
  }

  private getContractById(contractId: any): void {
    this.contractService.findContractInfo(contractId).subscribe(
      (data: any) => {
        console.log(data.payload);
        this.signatureForm.get('contractId')?.setValue(data.payload.contractId);
        this.signatureForm.get('contractCode')?.setValue(data.payload.contractCode);
      }
    );
  }

  onRegister(): void{
    console.log('nada aun');
  }
  // to manage up down files
 
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.signatureService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.signatureService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'No se puede cargar el archivo!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

}
