import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  loading: boolean = false;

  private subscription: Subscription | null = null;

  constructor(private ProductService: ProductService, private cartService: CartService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.ProductService.getProducts()
      .pipe(
        //Оператор tap примениться когда мы получим какой-либо ответ
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data: ProductType[]) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  //Отписка от subscribe
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}


