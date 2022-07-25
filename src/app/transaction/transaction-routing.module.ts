import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListWalletComponent} from "../wallet/list-wallet/list-wallet.component";
import {TransactionListComponent} from "./transaction-list/transaction-list.component";

const routes: Routes = [
  {path: 'list-transaction/:id', component: TransactionListComponent},
  {path: 'edit/:id', component: TransactionListComponent},
  {path: 'list-transaction/:id', component: TransactionListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
