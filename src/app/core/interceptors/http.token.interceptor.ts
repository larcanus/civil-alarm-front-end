import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor( private jwtService: JwtService ) {
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if ( token ) {
      // @ts-ignore
      headersConfig[ 'Authorization' ] = `token ${ token }`;
    }

    const request = req.clone( { setHeaders: headersConfig } );
    return next.handle( request );
  }
}
