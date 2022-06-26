import { CarTypeService } from 'src/app/services/car-type.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryState } from 'src/app/redux/category-state';
import store from 'src/app/redux/store';
import { categoryService } from 'src/app/services/category.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { CarTypeModel } from 'src/app/models/car-type.model';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


    public product = new ProductModel(); // Must create an object for the two-way binding
    public categories: ProductCategoryModel[];
    public carTypes: CarTypeModel[];

    constructor(private categoryService: categoryService,
        private productsService: ProductsService,
        private carTypeService: CarTypeService,
        private router: Router,
        private notify: NotifyService
    ) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
        // console.log(this.carTypes)
    }

    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public async add() {
        try {
            //this.product.productCategory_id = this.product.category?._id;
            //this.product.carType_id = this.product.carType?._id;
            await this.productsService.addProductAsync(this.product);
            IncompleteGuard.canLeave = true;
            this.notify.success("Product added");
            this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        this.categories = await this.categoryService.getAllCategoriesAsync();
        this.carTypes = await this.carTypeService.getAllCarTypesAsync();
    }
}
