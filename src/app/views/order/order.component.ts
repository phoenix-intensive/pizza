import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CartService } from "../../shared/services/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "../../shared/services/product.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  @ViewChild('popupSuccess') popupSuccess!: TemplateRef<ElementRef>;
  successDialogRef: MatDialogRef<any> | null = null;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private router: Router,
              private dialog: MatDialog, private fb: FormBuilder) {
  }

  form = this.fb.group({
    product: ["", Validators.required],
    address: ["", Validators.required],
    phone: ["", Validators.required],
  });

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    // Передача значений через url-параметры
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        // Используем patchValue для установки значения в форму
        this.form.patchValue({
          product: params['product']
        });
      }
    });
  }

  createOrder(): void {
    // Проверяем, что форма валидна перед отправкой
    if (this.form.invalid) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Открываем попап после успешного заполнения формы
    this.successDialogRef = this.dialog.open(this.popupSuccess);

    // Очищаем форму после закрытия попапа
    this.successDialogRef.afterClosed().subscribe((): void => {
      this.form.reset();
      this.router.navigate(['/']);
    });
  }


  closeSuccessPopup(): void {
    this.successDialogRef?.close();
    this.router.navigate(['/']);
  }

  // Отписка от подписок
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
