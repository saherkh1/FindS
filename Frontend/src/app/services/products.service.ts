import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryModel } from '../models/product-category.model';
import { ProductModel } from '../models/product.model';
import { ProductsActionType } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getAllProductsAsync(): Promise<ProductModel[]> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products;
    }
    public async getAllProductsInStockAsync(): Promise<ProductModel[]> {
        const products = await this.getAllProductsAsync();
        return products.filter(p => p.stockQuantity > 0);
    }
    public async getAllProductsNotInStockAsync(): Promise<ProductModel[]> {
        const products = await this.getAllProductsAsync();
        return products.filter(p => p.stockQuantity == 0);
    }
    public async getOneProductAsync(id: String): Promise<ProductModel> {
        const products = await this.getAllProductsAsync();
        return products.find(p => p._id === id);
    }

    public async getProductsByCarTypeCategoryAsync(CarType_id: String, category_id: String): Promise<ProductModel[]> {
        const products = await this.getAllProductsAsync();
        return products.filter(p => p.productCategory_id === category_id && p.carType_id === CarType_id);
    }

    public async addProductAsync(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("productCategory_id", product.productCategory_id.toString());
        formData.append("productCategory", JSON.stringify(product.category));
        formData.append("stockQuantity", product.stockQuantity.toString());
        formData.append("carType_id", product.carType_id.toString());
        formData.append("carType", JSON.stringify(product.carType));
        formData.append("image", product.image.item(0));
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, formData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductAdded, payload: addedProduct });
        return addedProduct;
    }

    public async updateProductAsync(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("productCategory_id", product.productCategory_id.toString());
        formData.append("productCategory", JSON.stringify(product.category));
        formData.append("stockQuantity", product.stockQuantity.toString());
        formData.append("carType_id", product.carType_id.toString());
        formData.append("carType", JSON.stringify(product.carType));
        if (product.image) formData.append("image", product.image.item(0));
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id, formData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductUpdated, payload: updatedProduct });
        return updatedProduct;
    }

    public async updateProductQuantityAsync(product: ProductModel): Promise<ProductModel> {
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id, product).toPromise();
        store.dispatch({ type: ProductsActionType.ProductUpdated, payload: updatedProduct });
        return updatedProduct;
    }
    public async deleteProductAsync(id: String): Promise<ProductModel[]> {
        //TODO: add the API
        const formData = new FormData();
        const updatedProduct = await this.http.delete<ProductModel>(environment.productsUrl + id).toPromise();
        store.dispatch({ type: ProductsActionType.ProductDeleted, payload: id });
        return store.getState().productsState.products;
    }

}
