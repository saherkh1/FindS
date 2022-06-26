import { AuthInterceptor } from './services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { ProductCardComponent } from './components/product-area/product-card/product-card.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/product-area/update-product/update-product.component';
import { ProductDetailsComponent } from './components/product-area/product-details/product-details.component';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { ValidationComponent } from './components/auth-area/validation/validation.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { DialogComponent } from './components/shared-area/dialog/dialog.component';
import { AddProductCategoryComponent } from './components/shared-area/add-product-category/add-product-category.component';
import { AddCityComponent } from './components/shared-area/add-city/add-city.component';
import { AddBarcodeComponent } from './components/shared-area/add-barcode/add-barcode.component';
import { AddCarModelComponent } from './components/shared-area/add-car-model/add-car-model.component';
import { AddCarTypeComponent } from './components/shared-area/add-car-type/add-car-type.component';
import { ManagementComponent } from './components/admin-area/management/management.component';
import { ProductAvailabilityCheckComponent } from './components/product-area/product-availability-check/product-availability-check.component';
import { AddProductByBarcodeComponent } from './components/product-area/add-product-by-barcode/add-product-by-barcode.component';
import { ProductUnavailableListComponent } from './components/product-area/product-unavailable-list/product-unavailable-list.component';


@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        ProductListComponent,
        ProductCardComponent,
        AddProductComponent,
        UpdateProductComponent,
        ProductDetailsComponent,
        AuthMenuComponent,
        CartComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        HomeComponent,
        ValidationComponent,
        OrderComponent,
        DialogComponent,
        AddProductCategoryComponent,
        AddCityComponent,
        AddBarcodeComponent,
        AddCarModelComponent,
        AddCarTypeComponent,
        ManagementComponent,
        ProductAvailabilityCheckComponent,
        AddProductByBarcodeComponent,
        ProductUnavailableListComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [LayoutComponent] //first component loaded
})
export class AppModule { }
