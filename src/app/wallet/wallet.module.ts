import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import {ListWalletComponent} from "./list-wallet/list-wallet.component";
import { WalletCreateComponent } from './wallet-create/wallet-create.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListWalletComponent,
    WalletCreateComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    ReactiveFormsModule,
  ]
})
export class WalletModule { }
