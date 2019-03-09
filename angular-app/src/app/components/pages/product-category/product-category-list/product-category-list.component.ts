import { Component, OnInit } from '@angular/core';
import {Product, ProductCategory} from "../../../../model";
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;
  product: Product = null;
  productCategory: ProductCategory = null;

  constructor(
      private route: ActivatedRoute,
      private productHttp: ProductHttpService,
      private productCategoryHttp: ProductCategoryHttpService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product
      this.getProduct();
      this.getProductCategory();
    })
  }

  private getProduct() {
     this.productHttp
         .get(this.productId)
         .subscribe(product => this.product = product);
  }

  private getProductCategory() {
     this.productCategoryHttp
         .list(this.productId)
         .subscribe(productCategory => {
           this.productCategory = productCategory
           console.log(this.productCategory);
         })
  }
}
