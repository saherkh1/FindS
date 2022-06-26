import { ProductModel } from "./product.model";

export class CartProductModel {
    public _id: string;
    public userId: string;
    public product_id: string;
    public cart_id: string;
    public product: ProductModel;
    public quantity: number;
    public totalPrice: number;

}
