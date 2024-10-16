import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType = {} as ProductType;

  private subscriptionRoute: Subscription | null = null;
  private subscriptionGetProduct: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    //Передача элементов через url-параметры
    this.subscriptionRoute = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.subscriptionGetProduct = this.productService.getProduct(+params['id'])
          .subscribe(
            {
              next: (data: ProductType) => {
                this.product = data;
              },
              error: (error) => {
                console.log(error);
                this.router.navigate(['/']);
              }
            }
          )
      }
    })
  }

  //Отписка от subscribe
  ngOnDestroy() {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionGetProduct?.unsubscribe();
  }
}
