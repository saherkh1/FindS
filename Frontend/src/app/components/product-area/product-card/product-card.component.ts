import { CarModelService } from 'src/app/services/car-model.service';
import { CarModelModel } from './../../../models/car-model.model';
import { ProductsService } from 'src/app/services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { CarTypeService } from 'src/app/services/car-type.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    public imageAddress: string;
    public isAuthorized: boolean = false;
    searchText = '';
    text = `somedummy text here`;

    @Input()
    public product: ProductModel;
    public carModel: CarModelModel;
    constructor(private cartService: CartService,
        private carModelService: CarModelService,
        private carTypeService: CarTypeService,
        private notify: NotifyService,
        private productsService: ProductsService) {
        //this.isAuthorized = store.getState().authState.user?.role === "admin";
    }

    public async addToCart() {
        try {
            //console.log(this.product);

            await this.cartService.addCartProductAsync(this.product);

            this.notify.success("Product added to cart.");
        }
        catch (err) {
            this.notify.error(err);
        }
    }
    public async deleteProduct() {
        try {
            this.productsService.deleteProductAsync(this.product._id);
            this.notify.success("Product Deleted.");
        }
        catch (err) {
            this.notify.error(err);
        }
    }
    async ngOnInit() {
        if (this.product) {
            this.imageAddress = environment.productImagesUrl + this.product.image;
            this.isAuthorized = store.getState().authState.user?.role === "admin";
            if (this.product.carType_id)
                this.product.carType =
                    await this.carTypeService.getCarTypeByIdAsync(this.product.carType_id);
            if (this.product.carType?.carModel_id)
                this.product.carType.carModel =
                    await this.carModelService.getCarModelAsync(this.product.carType.carModel_id);
        }
    }
}
