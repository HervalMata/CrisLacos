import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  variavel = 'Herval';

  constructor(private http: HttpClient) { }

  list() : Observable<{data: Array<Category>}> {
      const token = window.localStorage.getItem('token'); // Pega o token da API.
      return this.http.get<{data: Array<Category>}>
      ('http://localhost:8000/api/categories', {
          headers: {
              'Authorization' : `Bearer ${token}`
          }
      });
  }

  get(id: number) : Observable<Category> {
      const token = window.localStorage.getItem('token');
      return this.http.get<{data: Category}>
      (`http://localhost:8000/api/categories/${id}`, {
          headers: {
              'Authorization' : `Bearer ${token}`
          }
      })
          .pipe(
              map(response => response.data )
          );
  }

  create() {

  }

  update() {

  }

  destroy() {

  }
}
