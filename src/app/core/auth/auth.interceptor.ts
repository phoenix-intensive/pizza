import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Если нам нужно что-то изменить в ЗАПРОСЕ
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    //Если нам нужно что-то изменить в ОТВЕТЕ
    return next.handle(authReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log(event);
          }
        }
      })
    );
  }
}
