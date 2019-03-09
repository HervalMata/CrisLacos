import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductCategory} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private baseApi = '${enviroment.api.url}';
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) { }

    list(productId: number) : Observable<ProductCategory> {
        return this.http.get<{data: ProductCategory}>
        (this.getBaseUrl(productId), {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
          .pipe(
              map(response => response.data)
          );
    }

    create(productId: number, categoriesId: number[]) : Observable<Product> {
        return this.http.post<{data: Product}>
        (this.getBaseUrl(productId), {categories: categoriesId},{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    private getBaseUrl(productId: number, categoryId: number = null) : string {
      let baseUrl = '${this.baseApi}/products/${productId}/categories';
      if (categoryId) {
          baseUrl += '/${categoryId}';
      }
      return baseUrl;
    }
}
