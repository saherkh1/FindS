import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { BarcodeModel } from 'src/app/models/barcode.model';
import { ProductsService } from 'src/app/services/products.service';
import { BarcodeService } from 'src/app/services/barcode.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';

@Component({
    selector: 'app-add-barcode',
    templateUrl: './add-barcode.component.html',
    styleUrls: ['./add-barcode.component.css']
})
export class AddBarcodeComponent implements OnInit {

    public barcode = new BarcodeModel(); // Must create an object for the two-way binding
    public products: ProductModel[];

    constructor(private barcodeService: BarcodeService, private productsService: ProductsService, private router: Router, private notify: NotifyService) { }


    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async add() {
        try {
            await this.barcodeService.addBarcodeAsync(this.barcode);
            IncompleteGuard.canLeave = true;
            this.notify.success("Barcode added");
            // this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    async ngOnInit() {
        this.products = await this.productsService.getAllProductsAsync();
    }
}
