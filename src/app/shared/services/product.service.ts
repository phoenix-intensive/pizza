import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, retry, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: ProductType[] = [];

  constructor(private http: HttpClient) {

  }


  //Функция на получение всех товаров
  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType []>('https://testologia.ru/pizzas');

  }


  //Функция на получение одного товара
  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/pizzas?id=${id}`);
  }


  createOrder(data: { product: string, address: string, phone: string, }) {
    return this.http.post<{ success: string, message?: string }>(`https://testologia.ru/order-pizza`, data);
  }
}

