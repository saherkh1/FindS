import { CarModelModel } from '../models/car-model.model';
import { CarTypeModel } from '../models/car-type.model';

// CarModel App State: 
export class CarModelState {
    public CarModels: CarModelModel[] = [];
}

// CarModel Action Type: 
export enum CarModelActionType {
    CarModelDownloaded = "CarModelDownloaded",
    CarModelAdded = "CarModelAdded"
}

// CarModel Action: 
export interface CarModelAction {
    type: CarModelActionType;       // Which action are we doing.
    payload: any;               // Which data are we sending to the AppState.
}

// CarModel Reducer (the new CarModelState() is for the first time only - we create a new AppState):
export function CarModelReducer(currentState: CarModelState = new CarModelState(), action: CarModelAction): CarModelState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case CarModelActionType.CarModelDownloaded:
            newState.CarModels = action.payload; // Here action.payload MUST be the downloaded CarModel array!
            break;
        case CarModelActionType.CarModelAdded:
            newState.CarModels.push(action.payload); // Here action.payload MUST be the added product!
            break;
    }

    // Return the new state: 
    return newState;
}
