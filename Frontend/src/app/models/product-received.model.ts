import { CarTypeModel } from './car-type.model';
import { ProductCategoryModel } from "./product-category.model";

export class ProductReceivedModel {
    public _id: string;
    public product_id: string;
    public quantity: number;
    public totalBuyingPrice: number;
}
