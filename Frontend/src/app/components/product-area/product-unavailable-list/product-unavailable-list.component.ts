import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-unavailable-list',
    templateUrl: './product-unavailable-list.component.html',
    styleUrls: ['./product-unavailable-list.component.css']
})
export class ProductUnavailableListComponent implements OnInit {

    public products: ProductModel[];
    public isAuthorized: boolean = false;
    public IsListEmpty: boolean = false;
    constructor(private productsService: ProductsService, private notify: NotifyService) { }


    async ngOnInit() {
        try {
            console.log("im here")
            this.isAuthorized = store.getState().authState.user?.role === "admin";
            this.products = await this.productsService.getAllProductsNotInStockAsync();
            this.products && (this.IsListEmpty = true)
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }
}