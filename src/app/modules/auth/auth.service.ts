import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../../models/auth/jwt-dto';
import { UserLogin } from '../../models/auth/user-login';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(userLogin: UserLogin): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', userLogin);
  }

  public signup(user: User): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'user/signup', user);
  }
  
}
