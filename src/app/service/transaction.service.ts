import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
const API_URL = 'http://localhost:8081/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getTransactionByIdWallet(id: number, index: number): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>('http://localhost:8081/wallets/transaction-by-wallet-page' + `/${id}?page=${index}`);
  }
  getTransactionByIdWalletNoPage(id: number): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>('http://localhost:8081/wallets/transaction-by-wallet' + `/${id}`);
  }
  searchByDate(idWallet:any, from: any, to: any): Observable<Transaction[]> {
    return  this.httpClient.get<Transaction[]>(API_URL + `/search-by-create-date?id=${idWallet}&from=${from}&to=${to}`);
  }
  getById(id: any): Observable<Transaction> {
    return  this.httpClient.get<Transaction>(API_URL + `/${id}`);
  }
  update(id: number, transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${API_URL}/${id}`, transaction);
  }
  delete(id: string): Observable<Transaction> {
    return this.httpClient.delete<Transaction>(API_URL + `/${id}`);
  }
}
