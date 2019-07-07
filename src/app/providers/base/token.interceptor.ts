import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConnectionService } from 'src/app/services/connection/connection.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private connectionService: ConnectionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const getToken = this.getValidToken();

    const observable = from(getToken);

    return observable
      .pipe(
        switchMap(token => {
          return next.handle(this.getRequestHeader(token, req));
        })
      );
  }

  getRequestHeader(token: string, req: HttpRequest<any>) {
    let request;

    if (token) {
      request = this.injectToken(token, req)
    } else {
      request = req.clone();
    }

    return request;
  }

  private injectToken(token: string, req: HttpRequest<any>): any {
    return req.clone({
      setHeaders: {
        'Api-Key': `${token}`,
        Secret: `7qCWDrVmHZ`,
        Accept: 'application/hal+json;version=com.afkl.operationalflight.v3',
        'Accept-Language': 'en'
      }
    });
  }

  private getValidToken(): Promise<any> {
    return Promise.resolve(this.connectionService.getAirFranceKLMToken());
  }
}