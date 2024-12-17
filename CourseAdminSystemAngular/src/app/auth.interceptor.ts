/*import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const headerValue = localStorage.getItem('headerValue');

    // If the token exists, add it to the Authorization header
    if (headerValue) {
      console.log('Adding Authorization header:', `Basic ${headerValue}`);
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Basic ${headerValue}`  // Use Basic authentication with the token
        }
      });
      return next.handle(clonedRequest);  // Pass the modified request to the next handler
    }else {
      console.error('No token found in localStorage');
    }

    // If there's no token, just send the original request
    return next.handle(req);
  }
}*/