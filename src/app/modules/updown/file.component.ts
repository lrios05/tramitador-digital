import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { FileService } from './file.service';

import { AuthService } from '../auth/auth.service';
import { TokenService } from '../../services/token.service';
import { RoleUser } from '../../models/user/role-user';
import { UploadDetail } from '../../models/uploads/upload-detail';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  userId?: number;
  roles?: any;
  roleUsers?: RoleUser[];
  uploadDetail?: UploadDetail;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private fileService: FileService  
  ) { }

  ngOnInit(): void {
    let userEmail = this.tokenService.getUserName();
    this.getUserIdByEmail(userEmail!);
    this.getRolesList();
  }

  uploadForm: FormGroup = this.formBuilder.group({
    'userId': ['', [Validators.nullValidator]],
    'contractCode': ['', [Validators.required]],
    'subject': ['', [Validators.required]],
    'priority': ['normal',[Validators.required]],
    'days': [1, [Validators.required]],
    'deadLine': [new Date(), [Validators.required]],
    'instructionId': ['2', [Validators.required]],
    'fromUserId': ['', [Validators.required]],
    'toRoleId': ['', [Validators.required]],
    'toUserId': ['', [Validators.required]]
  });

  // Actions for sending note
  private getUserIdByEmail(userEmail: string): void {
    this.authService.findUser(userEmail).subscribe(
      (data: any) => {
        this.userId = data.payload.userId;
        this.uploadForm.get('userId')?.setValue(this.userId);
        this.uploadForm.get('fromUserId')?.setValue(this.userId);
      }
    );
  }

  private getRolesList(): void {
    this.authService.findAllRoles().subscribe(
      (data: any) => {
        this.roles = data.payload;
      }
    );
  }

  private findToRoleUsers(userRole: string){
    this.roles.find((e: any) => {
      if (e.role === userRole) {
        this.roleUsers = e.users;
        if (this.roleUsers?.length === 1) {
          this.uploadForm.get('toUserId')?.setValue(this.roleUsers[0].userId);
        }
        return true;
      }
      return false;
    });
  }

  toRoleEventHandler(event: MatSelectChange): void {
    let role = event.value;
    //this.roleTo = (event.source.selected as MatOption).viewValue;
    this.findToRoleUsers(role);
  }

  //onUploadFiles(files: File[]): void {
  onUploadFiles(event: any): void {
    const formData = new FormData();
    const files: File[] = event.target.files;

    for (const file of files) { formData.append('files', file, file.name); }

    this.fileService.upload(formData).subscribe(
      event => {
        //console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDownloadFile(filename: string): void {
    console.log('NOMBRE: ' + filename);

    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading...')
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading...')
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
          console.log(this.filenames);
        } else {
          FileSaver.saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          ));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  private formToUpload(){
    this.uploadDetail = new UploadDetail(
      this.uploadForm.get('userId')?.value,
      this.uploadForm.get('contractCode')?.value,
      this.uploadForm.get('subject')?.value,
      this.uploadForm.get('priority')?.value,
      this.uploadForm.get('days')?.value,
      this.uploadForm.get('deadLine')?.value,
      this.uploadForm.get('instructionId')?.value,
      this.uploadForm.get('fromUserId')?.value,
      this.uploadForm.get('toUserId')?.value,
      this.filenames
    );
  }

  onRegister(){
    this.formToUpload();
    //console.log(this.uploadDetail);
    this.fileService.createAttacheDocuments(this.uploadDetail!).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
    //this.router.navigate(['/checkout', 'PREVIEW']);
  }

}
