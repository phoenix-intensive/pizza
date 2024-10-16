import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./views/layout.component";



const routes: Routes = [
  //Lazy loading - ленивая загрузка роутов, роуты будут подключаться по мере их необходимости,
  //используется такой метод чаще всего на больших проектах, для оптимизации производительности приложения
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)},
      {path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
      {path: 'products', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)}
    ]
  },



  //Так же можем редиректить нужные нам страницы
  {path: 'pizza', redirectTo: 'products'},
  //Если не один из роутов не сработал, отправляем на главную страницу
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
