import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BarcodeModel } from '../models/barcode.model';
import { BarcodeActionType } from '../redux/barcode-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class BarcodeService {

    constructor(private http: HttpClient, private productsService: ProductsService) { }

    public async getAllBarCodesAsync(): Promise<BarcodeModel[]> {
        if (store.getState().barcodeState.BarCodes.length === 0) {
            const BarCodes = await this.http.get<BarcodeModel[]>(environment.barcodeUrl).toPromise();
            store.dispatch({ type: BarcodeActionType.BarcodeDownloaded, payload: BarCodes });
        }
        return store.getState().barcodeState.BarCodes;
    }
    public async getOneBarcodeAsync(name: String): Promise<BarcodeModel> {
        const BarCodes = await this.getAllBarCodesAsync();
        return BarCodes.find(p => p.name === name);
    }

    public async addBarcodeAsync(barcode: BarcodeModel): Promise<BarcodeModel> {
        const formData = new FormData();
        formData.append("name", barcode.name);
        formData.append("product_id", barcode.product_id);
        formData.append("product", JSON.stringify(this.productsService.getOneProductAsync(barcode.product_id)));
        const addedProductBarcode = await this.http.post<BarcodeModel>(environment.barcodeUrl, formData).toPromise();
        store.dispatch({ type: BarcodeActionType.BarcodeAdded, payload: addedProductBarcode });
        return addedProductBarcode;
    }
}
