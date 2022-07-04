import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { BarcodeModel } from 'src/app/models/barcode.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BarcodeService } from 'src/app/services/barcode.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-add-product-by-barcode',
    templateUrl: './add-product-by-barcode.component.html',
    styleUrls: ['./add-product-by-barcode.component.css']
})
export class AddProductByBarcodeComponent implements OnInit {

    public totalPrice: number;
    public barcode: number;
    public barcodeObject: BarcodeModel = null;
    public barCodes: BarcodeModel[];
    public quantity: number;
    private product: ProductModel;

    constructor(
        private barcodeService: BarcodeService,
        private productsService: ProductsService,
        private router: Router,
        private notify: NotifyService,
        private route: ActivatedRoute
    ) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
        // console.log(this.carTypes)
    }

    public async add() {
        try {

            if (this.barcode.toString().length !== 13) throw ("Barcode must be 13 digits");
            this.barcodeObject = await this.barcodeService.getOneBarcodeAsync(this.barcode.toString());
            if (this.barcodeObject === undefined) {
                IncompleteGuard.canLeave = true;
                this.router.navigateByUrl("/products/new?barcode=" + this.barcode + "&quantity=" + this.quantity + "&totalPrice=" + this.totalPrice);
                throw ("Add product to Continue");
            }
            this.product = await this.productsService.getOneProductAsync(this.barcodeObject?.product_id);

            this.product.stockQuantity += this.quantity;
            await this.productsService.updateProductQuantityAsync(this.product, this.quantity, this.totalPrice);
            IncompleteGuard.canLeave = true;
            this.notify.success("Product quantity Updated");
            this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        this.barCodes = await this.barcodeService.getAllBarCodesAsync();
        console.log(this.barCodes)

    }
}