import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Instruction } from '../../../models/follow-ups/instruction';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  instructionURL = 'http://localhost:8080/api/followup/';

  constructor(private httpClient: HttpClient) { }

  public findInstruction(id: number): Observable<Instruction> {
    return this.httpClient.get<Instruction>(`${this.instructionURL}findinstruction/${id}`);
  }

  public listInstructions(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(`${this.instructionURL}listinstructions`);
  }

  public createInstruction(instruction: Instruction): Observable<any> {
    return this.httpClient.post<any>(`${this.instructionURL}createinstruction`, instruction);
  }
  
}
