import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor{

  constructor(
      private authService: AuthService,
      private router: Router
      ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                  console.log(event);
                  this.setNewTokenIfResponseValid(event);
                }, (eventError: HttpEvent<any>) => {
                  this.redirectToLoginIfUnauthenticated(eventError);
                })
            );
    }


    private setNewTokenIfResponseValid(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
          const authorizationHeader = event.headers.get('authrization');
          if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            this.authService.setToken(token);
          }
        }
    }

    private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>) {
        if (eventError instanceof HttpErrorResponse && eventError.status == 401) {
          this.authService.setToken(null);
          this.router.navigate(['login']);
        }
    }
}
