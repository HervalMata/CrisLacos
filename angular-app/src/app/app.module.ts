import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import { ProductViewModalComponent } from './components/pages/product/product-view-modal/product-view-modal.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {AuthService} from "./services/auth.service";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'categories/list', component: CategoryListComponent },
    { path: 'users/list', component: UserListComponent },
    { path: 'products/:product/categories/list', component: ProductCategoryListComponent},
    { path: 'products/list', component: ProductListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
]

function jwtFactory(authService: AuthService) {
    return {
      whitelistedDomains: [
          new RegExp('localhost:8000/*')
      ],
      tokenGetter: () => {
        return authService.getToken();
      }
    }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryEditModalComponent,
    CategoryNewModalComponent,
    CategoryDeleteModalComponent,
    ProductDeleteModalComponent,
    ProductEditModalComponent,
    ProductListComponent,
    ProductNewModalComponent,
    NumberFormatBrPipe,
    ProductViewModalComponent,
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    UserNewModalComponent,
    UserListComponent,
    UserEditModalComponent,
    UserDeleteModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes, {enableTracing: true}),
    JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtFactory,
          deps: [AuthService]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
