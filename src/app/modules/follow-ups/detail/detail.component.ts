import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../auth/auth.service';
import { InstructionService } from '../instruction/instruction.service';
import { Instruction } from '../../../models/follow-ups/instruction';
import { Detail } from '../../../models/follow-ups/detail';
import { SelectOption } from '../../../shared/ui-elements/SelectOption';
import { Priority } from '../../../core/constants/priority';
import { DetailService } from './detail.service';
import { RoleUser } from '../../../models/user/role-user';
import { IDetail } from 'src/app/core/interfaces/idetail';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  roles?: any;
  roleUsers?: RoleUser[];
  noteDetail?: Detail;
  instructionList?: Instruction[];
  noteId?: any;
  userId?: number;
  userFrom?: string;
  roleFrom?: string;
  userTo?: string;
  roleTo?: string;
  instruction?: string;
  fakeId: number = 0;
  
  priorities: SelectOption[] = Priority;
  tableColumns: string[] = ['position', 'fromUser', 'toUser', 'date', 'instruction', 'delete'];
  dataTable: IDetail[] = [];

  dataSource = new MatTableDataSource<IDetail>(this.dataTable);

  @ViewChild(MatTable) tabla1: MatTable<IDetail> | undefined;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private tokenService: TokenService,
              private authService: AuthService,
              private instructionService: InstructionService,
              private detailService: DetailService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      param => {
        this.noteId = param.get('id');
      }
    );
    let userEmail = this.tokenService.getUserName();
    this.getInstructionsList();
    this.getRolesList();
    this.getUserIdByEmail(userEmail!);
  }

  detailForm: FormGroup = this.formBuilder.group({
    'days': [1, [Validators.required]],
    'deadLine': [new Date(), [Validators.required]],
    'comment': ['', [Validators.required]],
    'priority': ['normal', [Validators.required]],
    'fromUserId': ['', [Validators.required]],
    'toUserId': ['', [Validators.required]],
    'instructionId': ['', [Validators.required]]
  });

  private getInstructionsList(): void {
    this.instructionService.listInstructions().subscribe(
      (data: any) => {
        this.instructionList = data.payload;
      }
    );
  }

  private getUserIdByEmail(userEmail: string): void {
    this.authService.findUser(userEmail).subscribe(
      (data: any) => {
        this.userId = data.payload.userId;
        this.detailForm.get('fromUserId')?.setValue(this.userId);
        this.userFrom = data.payload.fullName;
      }
    );
  }

  private getRolesList(): void {
    this.authService.findAllRoles().subscribe(
      (data: any) => {
        this.roles = data.payload;
        this.setRoleFrom();
      }
    );
  }

  private setRoleFrom(): void {
    let userRole = this.tokenService.getAuthorities()[0];
    this.roles.find((e: any) => {
      if (e.role === userRole) {
        this.roleFrom = e.description;
        return true;
      }
      return false;
    });
  }

  private findToRoleUsers(userRole: string){
    this.roles.find((e: any) => {
      if (e.role === userRole) {
        this.roleUsers = e.users;
        if (this.roleUsers?.length === 1) {
          this.userTo = this.roleUsers[0].userName;
          this.detailForm.get('toUserId')?.setValue(this.roleUsers[0].userId);
        }
        return true;
      }
      return false;
    });
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

  instructionHandler(event: MatSelectChange){
    this.instruction = (event.source.selected as MatOption).viewValue;
  }

  toRoleEventHandler(event: MatSelectChange) {
    let role = event.value;
    this.roleTo = (event.source.selected as MatOption).viewValue;
    this.findToRoleUsers(role);
  }

  userEventHandler(event: MatSelectChange){
    this.userTo = (event.source.selected as MatOption).viewValue;
  }

  // To handle Instruction table details
  private getInstructionInstance(): IDetail{
    return new IDetail(
      this.roleFrom!,
      this.userFrom!,
      this.roleTo!,
      this.userTo!,
      new Date(),
      this.instruction!
    );
  }

  addInstruction() {
    let instruction = this.getInstructionInstance();
    this.dataTable.push(instruction);
    this.tabla1?.renderRows();
  }

  deleteInstruction(cod: number) {
    //if (confirm("Desea quitar la observación?")) {
      this.dataTable.splice(cod, 1);
      this.tabla1?.renderRows();
    //}
  }

  onRegister(): void {
    this.formToDetail();

    this.detailService.createDetail(this.noteId!, this.noteDetail!).subscribe(
      (data: any) => {
        this.noteDetail = data.payload;
      }
    );
    this.router.navigate(['/checkout', 'PREVIEW']);
  }

}
