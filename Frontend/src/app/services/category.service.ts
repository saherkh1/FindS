import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryModel } from '../models/product-category.model';
import { CategoryActionType } from '../redux/category-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class categoryService {

    constructor(private http: HttpClient) { }

    public async getAllCategoriesAsync(): Promise<ProductCategoryModel[]> {
        if (store.getState().categoryState.categories.length === 0) {
            const categories = await this.http.get<ProductCategoryModel[]>(environment.productCategoryUrl).toPromise();
            store.dispatch({ type: CategoryActionType.CategoryDownloaded, payload: categories });
        }
        return store.getState().categoryState.categories;
    }

    public async addProductCategoryAsync(category: ProductCategoryModel): Promise<ProductCategoryModel> {
        const formData = new FormData();
        formData.append("name", category.name);
        const addedProductCategory = await this.http.post<ProductCategoryModel>(environment.productCategoryUrl, formData).toPromise();
        store.dispatch({ type: CategoryActionType.CategoryAdded, payload: addedProductCategory });
        return addedProductCategory;
    }
}
