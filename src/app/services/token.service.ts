import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAutorities';
const USER_FULLNAME_KEY = 'UserFullName';
const CUSTOMER_KEY = 'CustomerId';
const BUSINESS_KEY = 'BusinessId';
const CONTRACT_KEY = 'ContractId';
const NOTE_KEY = 'NoteId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName() {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities() {
    this.roles = [];

    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(window.sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((element: any) => {
        this.roles.push(element.authority);
      });
    }
    return this.roles;
  }

  public setUserFullName(userFullName: string): void {
    window.sessionStorage.removeItem(USER_FULLNAME_KEY);
    window.sessionStorage.setItem(USER_FULLNAME_KEY, userFullName);
  }

  public getUserFullName() {
    return sessionStorage.getItem(USER_FULLNAME_KEY);
  }

  public setCustomer(customerId: string): void {
    window.sessionStorage.removeItem(CUSTOMER_KEY);
    window.sessionStorage.setItem(CUSTOMER_KEY, customerId);
  }

  public getCustomer() {
    return sessionStorage.getItem(CUSTOMER_KEY);
  }

  public setBusiness(businessId: string): void {
    window.sessionStorage.removeItem(BUSINESS_KEY);
    window.sessionStorage.setItem(BUSINESS_KEY, businessId);
  }

  public getBusiness() {
    return sessionStorage.getItem(CUSTOMER_KEY);
  }

  public setContract(contractId: string): void {
    window.sessionStorage.removeItem(CONTRACT_KEY);
    window.sessionStorage.setItem(CONTRACT_KEY, contractId);
  }

  public getContract() {
    return sessionStorage.getItem(CONTRACT_KEY);
  }

  public setNote(noteId: string): void {
    window.sessionStorage.removeItem(NOTE_KEY);
    window.sessionStorage.setItem(NOTE_KEY, noteId);
  }

  public getNote() {
    return sessionStorage.getItem(NOTE_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
