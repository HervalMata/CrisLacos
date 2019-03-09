import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../model";
import {JwtHelperService} from '../../../node_modules/@auth0/angular-jwt';

const TOKEN_KEY = 'cris_lacos_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  me: User = null;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: {email: string, password: string}) : Observable<{token: string}> {
    return this.http.post<{token: string}>('${enviroment.api.url}/login', user)
        .pipe(
            tap(response => {
              this.setToken(response.token)
            })
        );
  }

  logout() : Observable<any> {
      return this.http.
            post<{token: string}>('${enviroment.api.url}/logout', {})
          .pipe(
              tap(() => {
                  this.setToken(null)
              })
          );
  }


  setToken(token: string) {
      this.setUserFromToken(token);
      window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() : string | null {
      return window.localStorage.getItem(TOKEN_KEY);
  }

  private setUserFromToken(token: string) {
     const decodeToken = new JwtHelperService().decodeToken(token);
     // @ts-ignore
      this.me = decodeToken ? {id: decodeToken.sub, name: decodeToken.name, email: decodeToken.email} : null;
  }

  isAuth() : boolean {
      const token = this.getToken();
      return !new JwtHelperService().isTokenExpired(token, 30);
  }
}
