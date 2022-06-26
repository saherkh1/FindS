import { CarTypeModel } from './../models/car-type.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../redux/store';
import { CarTypeActionType } from '../redux/car-type-state';

@Injectable({
    providedIn: 'root'
})
export class CarTypeService {

    constructor(private http: HttpClient) { }

    public async getAllCarTypesAsync(): Promise<CarTypeModel[]> {
        if (store.getState().carTypeState.CarTypes.length === 0) {
            const carTypes = await this.http.get<CarTypeModel[]>(environment.carTypeUrl).toPromise();
            store.dispatch({ type: CarTypeActionType.CarTypeDownloaded, payload: carTypes });
        }
        return store.getState().carTypeState.CarTypes;
    }
    public async getCarTypeByModelAsync(CarModel_id: string): Promise<CarTypeModel[]> {
        const carTypes = await this.getAllCarTypesAsync();
        return carTypes.filter(element => element.carModel_id === CarModel_id);
    }
    public async getCarTypeByIdAsync(_id: string): Promise<CarTypeModel> {
        return (await this.getAllCarTypesAsync()).find(element => element._id === _id);
    }

    public async addCarTypeAsync(carType: CarTypeModel): Promise<CarTypeModel> {
        const formData = new FormData();
        formData.append("carModel_id", carType.carModel_id);
        // formData.append("carModel", carType.carModel.toString());
        formData.append("name", carType.name);
        formData.append("year", carType.year.toString());
        const addedCarType = await this.http.post<CarTypeModel>(environment.carTypeUrl, formData).toPromise();
        store.dispatch({ type: CarTypeActionType.CarTypeAdded, payload: addedCarType });
        return addedCarType;
    }
}
