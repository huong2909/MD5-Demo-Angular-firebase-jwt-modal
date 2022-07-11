import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../model/wallet";
const API_URL ='http://localhost:8081/wallets/findByUser/';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient: HttpClient) {

  }
  getAll(): Observable<Wallet[]> {
    // @ts-ignore
    const data = localStorage.getItem('USERID');
    console.log(data)
    // @ts-ignore
    let a = JSON.parse(data)
    console.log("-------------------")
    console.log(a)
    return this.httpClient.get<Wallet[]>(API_URL + a);
  }
  save(wallet: any): Observable<Wallet> {
    return this.httpClient.post<Wallet>('http://localhost:8081/wallets/create-wallet', wallet);
  }
}
