import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../../core/auth/auth.service";


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() scrollToEventProducts: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();
  @Output() scrollToEventOrder: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  public loggedState: boolean = false;

  constructor(public cartService: CartService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      console.log('Состояние изменилось: ' + isLoggedIn)
    })
  }

  scrollToBlockProducts(): void {
    this.scrollToEventProducts.emit()
  }

  scrollToBlockOrder(): void {
    this.scrollToEventOrder.emit()
  }

  logIn() {
    this.authService.logIn();
  }

  logOut() {
    this.authService.logOut();
  }
}
