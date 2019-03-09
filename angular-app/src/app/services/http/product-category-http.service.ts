import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductCategory} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) { }

    list(productId: number) : Observable<ProductCategory> {
        return this.http.get<{data: ProductCategory}>
        (`http://localhost:8000/api/products/${productId}/categories`, {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
          .pipe(
              map(response => response.data)
          );
    }
}
