import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../auth/auth.service';
import { InstructionService } from '../instruction/instruction.service';
import { NoteService } from './note.service';
import { Instruction } from '../../../models/follow-ups/instruction';
import { NoteDetail } from '../../../models/follow-ups/note-detail';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Priority } from '../../../core/constants/priority';
import { Role } from '../../../core/constants/Role';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  priorities: SelectOption[] = Priority;
  roles: SelectOption[] = Role;
  noteDetail?: NoteDetail;
  instructions?: Instruction[];
  userId?: number;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private instructionService: InstructionService,
              private noteService: NoteService) { }

  ngOnInit(): void {
    this.getInstructionsList();
  }

  noteForm: FormGroup = this.formBuilder.group({
    'currentDate': [new Date(), [Validators.required]],
    'days': [0, [Validators.required]],
    'deadLine': [new Date(), [Validators.required]],
    'subject': ['', [Validators.required]],
    'userId': ['', [Validators.required]],
    'comment': ['', [Validators.required]],
    'priority': ['', [Validators.required]],
    'fromUserId': ['', [Validators.required]],
    'toUserId': ['', [Validators.required]],
    'noteId': ['', [Validators.required]]
  });

  private getInstructionsList(): void {
    this.instructionService.listInstructions().subscribe(
      data => {
        let res: any = data;
        this.instructions = res.payload;
        console.log(this.instructions);
      }
    );
  }

  onRegister(): void {
    let userEmail = this.tokenService.getUserName();
    let contractId: any = this.tokenService.getContract();
    this.getUserIdByEmail(userEmail!);
    this.formToNoteDetail();

    this.noteService.createNote(contractId, this.noteDetail!).subscribe(
      data => {
        let res: any = data;
        console.log(res.payload);
      }
    );
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

  private getUserIdByEmail(userEmail: string): void {
    this.authService.findUser(userEmail).subscribe(
      data => {
        let res: any = data;
        this.userId = res.payload.userId;
        console.log(res.payload);
        console.log(this.userId);
      }
    );
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

  fromRoleHandler(fromUserId: number){

  }

  toRoleHandler(fromUserId: number){

  }

}
