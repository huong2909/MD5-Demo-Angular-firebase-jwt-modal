import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
import {ChildrenCategory} from "../model/children-category";
const API_URL = 'http://localhost:8081/categories/getChildCategory'
@Injectable({
  providedIn: 'root'
})
export class ChildCategoryService {

  constructor(private httpClient: HttpClient) {

  }
  getByParentId(id: any): Observable<ChildrenCategory[]> {
    return  this.httpClient.get<ChildrenCategory[]>(API_URL + `/${id}`);
  }
}
