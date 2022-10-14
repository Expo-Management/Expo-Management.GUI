import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { local } from 'd3-selection';
import { CustomPopUpService } from './custom-pop-up.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private customPopUpService: CustomPopUpService
  ) {}

  openCustomPopUp(title: string, message: string) {
    this.customPopUpService.confirm(title, message, undefined);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    const accessToken = this.tokenService.getAccessToken();

    if (accessToken != null) {
      authReq = this.addTokenHeader(request, accessToken);
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('Authenticate/login') &&
          error.status === 401
        ) {
          return this.handle401Error(accessToken!, authReq, next);
        } else if (error.status === 400) {
          this.openCustomPopUp(
            'Error en la solicitud',
            'La solicitud fue rechazada, revise los datos enviados.'
          );
        } else if (error.status === 403) {
          this.openCustomPopUp(
            'No autorizado',
            'Esta solicitud no esta permitida para su rol actual, por favor contacte administracion o cree una cuenta con el rol especifico'
          );
        } else if (error.status === 500) {
          this.openCustomPopUp(
            'Error en el servidor',
            'Error en el servidor al procesar la solicitud, por favor contacte administracion.'
          );
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(
    accessToken: string,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenService.getRefreshToken();

      if (refreshToken) {
        return this.authService.refresh_token(accessToken, refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveAccessToken(token.accessToken);
            this.tokenService.saveRefreshToken(token.refreshToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            if (err.status === 401) {
              this.isRefreshing = false;
              this.tokenService.refreshTokens();
            }
            return throwError(err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
];
