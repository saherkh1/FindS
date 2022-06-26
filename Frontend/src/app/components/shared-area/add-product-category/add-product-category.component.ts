import { categoryService } from './../../../services/category.service';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';

@Component({
    selector: 'app-add-product-category',
    templateUrl: './add-product-category.component.html',
    styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {


    public product = new ProductCategoryModel(); // Must create an object for the two-way binding
    //public categories: ProductCategoryModel[];

    constructor(private categoryService: categoryService, private router: Router, private notify: NotifyService) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async add() {
        try {
            await this.categoryService.addProductCategoryAsync(this.product);
            IncompleteGuard.canLeave = true;
            this.notify.success("Product category added");
            // this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        //this.categories = await this.categoryService.getAllCategoriesAsync();
    }
}
