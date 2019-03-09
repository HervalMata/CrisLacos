import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

  variavel = 'Herval';
  private baseUrl = '${enviroment.api.url}/categories';
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams) : Observable<{data: Array<Category>, meta: any}> {

      const sParams: any = new SearchParamsBuilder(searchParams).makeObject();

      const params = new HttpParams({
          fromObject: (<any>sParams)
      });

      return this.http.get<{data: Array<Category>, meta: any}>
      (this.baseUrl, {
          params
      });
  }

  get(id: number) : Observable<Category> {
      return this.http.get<{data: Category}>
      (`{this.baseUrl}/${id}`)
      .pipe(
         map(response => response.data )
      );
  }

  create(data: Category) : Observable<Category> {
      return this.http.post<{data: Category}>
      (this.baseUrl, data,)
       .pipe(
          map(response => response.data )
       );
  }

  update(id: number, data: Category) : Observable<Category> {
      return this.http.put<{data: Category}>
      (`${this.baseUrl}/${id}`, data,)
      .pipe(
         map(response => response.data )
      );
  }

  destroy(id: number) {
      return this.http.delete<{data: Category}>
      (`${this.baseUrl}/${id}`,);
  }
}
