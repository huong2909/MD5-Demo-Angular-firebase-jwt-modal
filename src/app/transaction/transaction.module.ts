import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import {TransactionListComponent} from "./transaction-list/transaction-list.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule
  ]
})
export class TransactionModule { }
