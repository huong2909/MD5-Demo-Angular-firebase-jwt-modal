import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../component/login/login.component";
import {ListWalletComponent} from "./list-wallet/list-wallet.component";
import {WalletCreateComponent} from "./wallet-create/wallet-create.component";

const routes: Routes = [
  {path: '', component: ListWalletComponent},
  {path: 'create', component: WalletCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
