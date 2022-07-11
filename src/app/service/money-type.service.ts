import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MoneyType} from "../model/money-type";
const API_URL ='http://localhost:8081/moneytypes';
@Injectable({
  providedIn: 'root'
})
export class MoneyTypeService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<MoneyType[]> {
    return this.httpClient.get<MoneyType[]>(API_URL);
  }
}
