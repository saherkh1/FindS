import { CityActionType } from './../redux/city-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityModel } from '../models/city.model';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) { }

    public async getAllCitiesAsync(): Promise<CityModel[]> {
        if (store.getState().cityState.cities.length === 0) {
            const Cities = await this.http.get<CityModel[]>(environment.cityUrl).toPromise();
            store.dispatch({ type: CityActionType.CityDownloaded, payload: Cities });
        }
        return store.getState().cityState.cities;
    }

    public async addCityAsync(City: CityModel): Promise<CityModel> {
        const formData = new FormData();
        formData.append("name", City.name);
        const addedCity = await this.http.post<CityModel>(environment.cityUrl, formData).toPromise();
        store.dispatch({ type: CityActionType.CityAdded, payload: addedCity });
        return addedCity;
    }
}
