import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {

  constructor() { }

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean   = false;

  logIn() {
    this.isLogged = true;
    this.isLogged$.next(this.isLogged);
  }

  logOut() {
    this.isLogged = false;
    this.isLogged$.next(this.isLogged);
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  getToken() {
    return 'token'
  }
}
