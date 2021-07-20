import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../auth/auth.service';
import { InstructionService } from '../instruction/instruction.service';
import { Instruction } from '../../../models/follow-ups/instruction';
import { Detail } from '../../../models/follow-ups/detail';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Priority } from '../../../core/constants/priority';
import { Role } from '../../../core/constants/Role';
import { DetailService } from './detail.service';
import { RoleUser } from '../../../models/user/role-user';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  priorities: SelectOption[] = Priority;
  roles: SelectOption[] = Role;
  noteDetail?: Detail;
  instructionList?: Instruction[];
  userList?: RoleUser[] = [
    {userId: 1, fullname: 'Fulanito Perez Canqui'},
    {userId: 2, fullname: 'Pedro Toribio Toro'}
  ];
  userId?: number;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private instructionService: InstructionService,
              private detailService: DetailService) { }

  ngOnInit(): void {
    this.getInstructionsList();
  }

  detailForm: FormGroup = this.formBuilder.group({
    'days': [0, [Validators.required]],
    'deadLine': [new Date(), [Validators.required]],
    'comment': ['', [Validators.required]],
    'priority': ['', [Validators.required]],
    'fromUserId': ['', [Validators.required]],
    'toUserId': ['', [Validators.required]],
    'idInstruction': ['', [Validators.required]]
  });

  onRegister(): void {
    let userEmail = this.tokenService.getUserName();
    let noteId = this.tokenService.getNote();
    this.getUserIdByEmail(userEmail!);
    this.formToDetail();

    this.detailService.createDetail(noteId!, this.noteDetail!).subscribe(
      data => {
        let res: any = data;
        this.noteDetail = res.payload;
        console.log(this.noteDetail);
      }
    );
  }

  private getInstructionsList(): void {
    this.instructionService.listInstructions().subscribe(
      data => {
        let res: any = data;
        this.instructionList = res.payload;
        console.log(this.instructionList);
      }
    );
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

  private formToDetail() {
    this.noteDetail = new Detail(
      this.detailForm.get('deadLine')?.value,
      this.detailForm.get('comment')?.value,
      this.detailForm.get('priority')?.value,
      this.detailForm.get('fromUserId')?.value,
      this.detailForm.get('toUserId')?.value,
      this.detailForm.get('instructionId')?.value);
  }

  dayEventHandler(event: any) {
    console.log(event);
  }

  roleEventHandler(rolId: number) {
    console.log(rolId);
  }

  userEventHandler(userId: number){
    console.log(userId);
  }

}
