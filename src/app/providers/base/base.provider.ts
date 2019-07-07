import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  timeout, catchError, retry
} from 'rxjs/operators';
import { ConnectionService } from 'src/app/services/connection/connection.service';

@Injectable()
export class BaseProvider {
  constructor(
    private http: HttpClient,
    private connectionService: ConnectionService,
  ) {


  }

  public getHTTP(url: string): Promise<any> {
    return this.http.get(url)
    .pipe(
      timeout(this.connectionService.timeout),
      catchError(error => {throw error;}),
      retry(3)
    )
    .toPromise();
  }

  public postHTTP(url: string, parameters: any, options?: any): Promise<any> {
    return this.http.post(url, parameters, options)
      .pipe(
        timeout(this.connectionService.timeout),
        catchError(error => {throw error;}),
        retry(3)
      )
      .toPromise();
  }

  public putHTTP(url: string, parameters: any, options?: any): Promise<any> {
    return this.http.put(url, parameters, options)
      .pipe(
        timeout(this.connectionService.timeout),
        catchError(error => {throw error;}),
        retry(3)
      )
      .toPromise();
  }

  public deletHTTP(url: string): Promise<any> {
    return this.http.delete(url)
      .pipe(
        timeout(this.connectionService.timeout),
        catchError(error => {throw error;}),
        retry(3)
      )
      .toPromise();
  }
}
