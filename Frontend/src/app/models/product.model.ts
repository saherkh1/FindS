import { CarTypeModel } from './car-type.model';
import { ProductCategoryModel } from "./product-category.model";

export class ProductModel {
    public _id: string;
    public productCategory_id: string;
    public category: ProductCategoryModel;
    public carType_id: string;
    public carType: CarTypeModel;
    public name: string;
    public stockQuantity: number;
    public price: number;
    public imageName: string;
    public image: FileList;
}
