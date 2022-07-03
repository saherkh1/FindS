import { OrderModel } from './../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }
    public async createOrderAsync(order: OrderModel): Promise<OrderModel> {
        const formData = new FormData();
        formData.append("city_id", order.city_id.toString());
        formData.append("street", order.street.toString());
        formData.append("shippingDate", order.shippingDate.toString());
        formData.append("cardNumber", order.cardNumber.toString().slice(12));
        formData.append("totalPrice", order.totalPrice.toString())
        formData.append("user_id", order.user_id)
        formData.append("cart_id", order.cart_id)
        const createdOrder = await this.http.post<OrderModel>(environment.order, formData).toPromise();
        return createdOrder;
    }



}
