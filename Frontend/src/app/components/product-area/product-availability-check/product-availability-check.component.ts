import { CarModelModel } from './../../../models/car-model.model';
import { CarTypeModel } from 'src/app/models/car-type.model';
import { Component, OnInit } from '@angular/core';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CarModelService } from 'src/app/services/car-model.service';
import { categoryService } from 'src/app/services/category.service';
import { NotifyService } from 'src/app/services/notify.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { CarTypeService } from 'src/app/services/car-type.service';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-product-availability-check',
    templateUrl: './product-availability-check.component.html',
    styleUrls: ['./product-availability-check.component.css']
})
export class ProductAvailabilityCheckComponent implements OnInit {


    public carModel_id: string = null;
    public carModels: CarModelModel[];
    public IsCarModelSet: boolean = false;
    public carType_id: string; // Must create an object for the two-way binding
    public carTypes: CarTypeModel[] = null;
    public IsCarTypeSet: boolean = false;
    public category_id: string;
    public categories: ProductCategoryModel[];
    public IsCategorySet: boolean = false;
    public product_id: string;
    public product = new ProductModel();
    public products: ProductModel[];
    public IsProductSet: boolean = false;
    public isAuthorized: boolean = false;


    constructor(private carModelService: CarModelService,
        private carTypeService: CarTypeService,
        private productCategoryService: categoryService,
        private productsService: ProductsService,
        private notify: NotifyService
    ) { }


    public async changeOccurred() {
        IncompleteGuard.canLeave = false;
    }
    public async carModelChanged() {
        // console.log("carModelChanged")

        this.IsCarModelSet = true;//this.carModel?._id !== undefined;
        // console.log("carModelChanged " + this.carModel_id)
        // console.log(this.carModel_id)
        if (this.carModel_id)
            this.carTypes = await this.carTypeService.getCarTypeByModelAsync(this.carModel_id);
        // this.notify.success("IsCarTypeSet " + this.IsCarTypeSet.toString());
        this.IsCarTypeSet = true;
        this.IsCategorySet = false;
        this.categories = null;
        this.IsProductSet = false;
        this.product = null;
    }
    public async carTypeChanged() {
        // console.log("carTypeChanged")

        this.IsCarTypeSet = true;//this.carType?._id !== undefined;
        this.categories = await this.productCategoryService.getAllCategoriesAsync();
        // this.notify.success("IsCategorySet " + this.IsCategorySet.toString());
        this.IsCategorySet = true;
        this.IsProductSet = false;
        this.products = null;
    }
    public async categoryChanged() {
        this.IsCategorySet = true;//this.carModel?._id !== undefined;
        // console.log("categoryChanged")
        // console.log(this.carType_id)
        // console.log(this.category_id)

        this.products = await
            this.productsService.getProductsByCarTypeCategoryAsync(this.carType_id, this.category_id);
        // console.log(this.products);
        // this.notify.success("IsProductSet " + this.IsProductSet.toString())
        this.IsProductSet = false;
        this.product = null;
    }
    public async productChanged() {
        this.IsProductSet = true;//this.carModel?._id !== undefined;
        this.product = await this.productsService.getOneProductAsync(this.product_id);
        // console.log(this.product)
        // this.notify.success("IsCarTypeSet " + this.IsCarTypeSet.toString());

    }

    async ngOnInit() {
        // console.log("ngOnInit")
        this.carModels = await this.carModelService.getAllCarModelsAsync();
        this.isAuthorized = store.getState().authState.user?.role === "admin";
        this.IsCarModelSet = false;
        this.IsCarTypeSet = false;
        this.IsCategorySet = false;
        this.IsProductSet = false;
        // console.log(this.IsCarModelSet);
        // console.log(this.IsCarTypeSet);
        // console.log(this.IsCategorySet);
        // console.log(this.IsProductSet);
    }

}
