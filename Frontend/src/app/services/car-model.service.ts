import { CarModelModel } from './../models/car-model.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../redux/store';
import { CarModelActionType } from '../redux/car-model-state';

@Injectable({
    providedIn: 'root'
})
export class CarModelService {

    constructor(private http: HttpClient) { }

    public async getAllCarModelsAsync(): Promise<CarModelModel[]> {
        if (store.getState().carModelState.CarModels.length === 0) {
            const categories = await this.http.get<CarModelModel[]>(environment.carModelUrl).toPromise();
            store.dispatch({ type: CarModelActionType.CarModelDownloaded, payload: categories });
        }
        return store.getState().carModelState.CarModels;
    }

    public async getCarModelAsync(carModel_id: string): Promise<CarModelModel> {
        const carModels = await this.getAllCarModelsAsync();
        // console.log(carModels)
        // console.log(carModel_id)
        return carModels.find(element => element._id === carModel_id);
    }

    public async addCarModelAsync(carModel: CarModelModel): Promise<CarModelModel> {
        const formData = new FormData();
        formData.append("name", carModel.name);
        const addedCarModel = await this.http.post<CarModelModel>(environment.carModelUrl, formData).toPromise();
        store.dispatch({ type: CarModelActionType.CarModelAdded, payload: addedCarModel });
        return addedCarModel;
    }
}
