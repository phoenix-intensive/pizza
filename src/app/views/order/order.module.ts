import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {TuiButtonModule} from "@taiga-ui/core";
import {MatDialogModule} from "@angular/material/dialog";
import {IConfig, NgxMaskModule} from "ngx-mask";

const maskConfig: Partial<IConfig> = {
  validation: false
};


@NgModule({
  declarations: [
    OrderComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    OrderRoutingModule,
    InputTextModule,
    TuiButtonModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    OrderRoutingModule
  ]
})
export class OrderModule { }
