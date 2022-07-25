import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AuthGuard} from "./helper/auth-guard";

const routes: Routes = [
  {path: '', pathMatch: 'full',redirectTo: 'login'},
  {
    path: 'login',
    loadChildren: () => import('./component/login.module').then(module => module.LoginModule)
  },
  {
    path: 'wallet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./wallet/wallet.module').then(module => module.WalletModule)
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    loadChildren: () => import('./transaction/transaction.module').then(module => module.TransactionModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
