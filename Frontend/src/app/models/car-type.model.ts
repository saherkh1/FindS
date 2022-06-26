import { CarModelModel } from "./car-model.model";

export class CarTypeModel {
    public _id: string;
    public carModel_id: string;
    public carModel: CarModelModel;
    public name: string;
    public year: Number;
}
