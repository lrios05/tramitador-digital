import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../../models/auth/jwt-dto';
import { UserLogin } from '../../models/auth/user-login';
import { User } from '../../models/user/user';
import { Role } from '../../models/user/role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public findUser(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.authURL}user/find/${email}`);
  }

  public login(userLogin: UserLogin): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', userLogin);
  }

  public signup(user: User): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'user/signup', user);
  }

  // Logica para los Roles

  public findRole(roleId: number): Observable<Role> {
    return this.httpClient.get<Role>(`${this.authURL}role/find/${roleId}`);
  }

  public findAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.authURL}role/list`);
  }

  public create(role: Role): Observable<any> {
    return this.httpClient.post<any>(`${this.authURL}role/create`, role);
  }

  
}
