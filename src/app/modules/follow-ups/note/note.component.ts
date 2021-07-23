import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../auth/auth.service';
import { FileService } from '../../updown/file.service';
import { InstructionService } from '../instruction/instruction.service';
import { NoteService } from './note.service';
import { Instruction } from '../../../models/follow-ups/instruction';
import { NoteDetail } from '../../../models/follow-ups/note-detail';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Priority } from '../../../core/constants/priority';
import { RoleUser } from '../../../models/user/role-user';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  priorities: SelectOption[] = Priority;
  roles?: any;
  usersFrom?: RoleUser[];
  usersTo?: RoleUser[];
  noteDetail?: NoteDetail;
  instructions?: Instruction[];
  contractAttache: any;
  documents: any = [];
  userId?: number;
  noteId?: number;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private fileService: FileService,
    private instructionService: InstructionService,
    private noteService: NoteService) { }

  ngOnInit(): void {
    
    this.getInstructionsList();
    let userEmail = this.tokenService.getUserName();
    this.getUserIdByEmail(userEmail!);
    this.getRolesList();
  }

  noteForm: FormGroup = this.formBuilder.group({
    'days': [2, [Validators.required]],
    'userId': ['', [Validators.nullValidator]],
    'deadLine': [new Date(), [Validators.required]],
    'subject': ['', [Validators.required]],
    'contract': ['', [Validators.required]],
    'comment': [''],
    'priority': ['normal', [Validators.required]],
    'fromRoleId': ['',[Validators.required]],
    'fromUserId': ['', [Validators.required]],
    'toRoleId': ['', [Validators.required]],
    'toUserId': ['', [Validators.required]],
    'instructionId': [1, [Validators.required]]
  });

  private getInstructionsList(): void {
    this.instructionService.listInstructions().subscribe(
      (data: any) => {
        this.instructions = data.payload;
      }
    );
  }

  private getUserIdByEmail(userEmail: string): void {
    this.authService.findUser(userEmail).subscribe(
      data => {
        let res: any = data;
        this.userId = res.payload.userId;
        this.noteForm.get('userId')?.setValue(this.userId);
      }
    );
  }

  private getRolesList(): void {
    let userRole = this.tokenService.getAuthorities()[0];

    this.authService.findAllRoles().subscribe(
      (data: any) => {
        this.roles = data.payload;
        this.findRoleUsers(userRole);
        this.noteForm.get('fromRoleId')?.setValue(userRole);
      }
    );
  }

  private findRoleUsers(userRole: string){
    this.roles.find((e: any) => {
      if (e.role === userRole) {
        this.usersFrom = e.users;
        if (this.usersFrom?.length === 1) {
          this.noteForm.get('fromUserId')?.setValue(this.usersFrom[0].userId);
        }
        return true;
      }
      return false;
    });
  }

  private findToRoleUsers(userRole: string){
    this.roles.find((e: any) => {
      if (e.role === userRole) {
        this.usersTo = e.users;
        if (this.usersTo?.length === 1) {
          this.noteForm.get('toUserId')?.setValue(this.usersTo[0].userId);
        }
        return true;
      }
      return false;
    });
  }

  daysHandler(event: any): void {
    let days: number = event.target.value;
    let newDeadLine: Date = this.addDaysToDate(days);
    this.noteForm.controls['deadLine'].setValue(newDeadLine);
  }

  private addDaysToDate(days: number): Date {
    console.log('DAYS ' + days);
    var date: Date = this.noteForm.get('deadLine')?.value;
    var currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  private formToNoteDetail() {
    this.noteDetail = new NoteDetail(
      this.noteForm.get('deadLine')?.value,
      this.noteForm.get('subject')?.value,
      this.noteForm.get('userId')?.value,
      this.noteForm.get('comment')?.value,
      this.noteForm.get('priority')?.value,
      this.noteForm.get('fromUserId')?.value,
      this.noteForm.get('toUserId')?.value,
      this.noteForm.get('instructionId')?.value);
  }

  fromRoleHandler(event: MatSelectChange) {
    console.log(event.value);
  }

  toRoleHandler(event: MatSelectChange) {
    let toRole = event.value;
    this.findToRoleUsers(toRole);
  }

  getDocuments(){
    let codigo = this.noteForm.get('contract')?.value;
   
    this.fileService.findByContractCode(codigo).subscribe(
      (data: any) => {
        this.contractAttache = data.payload;
        this.documents = data.payload.documentDtoList;
      }
    );
  }

  showDocument(document: string){
    alert('This dococument: ' + document);
  }


  onRegister(): void {
    let contractId = this.contractAttache.contractPartDto.contractId;
    this.formToNoteDetail();

    this.noteService.createNote(contractId, this.noteDetail!).subscribe(
      (data: any) => {
        console.log(data.payload);
        this.noteId = data.payload.noteId;
      }
    );

    this.router.navigate(['/checkout', this.noteId, 'PREVIEW']);
  }

}
