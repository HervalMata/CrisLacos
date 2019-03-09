import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Product } from "../../model";
import {map} from "rxjs/operators";
import {HttpResource} from "./http-resource";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

    private baseUrl = 'http://localhost:8000/api/products';
    private token = window.localStorage.getItem('token');

    constructor(private http: HttpClient) { }

    list(page: number) : Observable<{data: Array<Product>, meta: any}> {
        const params = new HttpParams({
            fromObject: {
                page: page + ""
            }
        });
        return this.http.get<{data: Array<Product>, meta: any}>
        (this.baseUrl, {
            params,
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }

    get(id: number) : Observable<Product> {
        return this.http.get<{data: Product}>
        (`{this.baseUrl}/${id}`, {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    create(data: Product) : Observable<Product> {
        return this.http.post<{data: Product}>
        (this.baseUrl, data,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    update(id: number, data: Product) : Observable<Product> {
        return this.http.put<{data: Product}>
        (`${this.baseUrl}/${id}`, data,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    destroy(id: number) {
        return this.http.delete<{data: Product}>
        (`${this.baseUrl}/${id}`,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }
}
