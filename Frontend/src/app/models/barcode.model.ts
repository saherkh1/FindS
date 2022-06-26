import { ProductModel } from 'src/app/models/product.model';
import { CarTypeModel } from './car-type.model';

export class BarcodeModel {
    public _id: string;
    public product_id: string;
    public product: ProductModel;
    public name: string;
}
