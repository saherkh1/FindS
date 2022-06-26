import { CityModel } from './../models/city.model';

// City App State: 
export class CityState {
    public cities: CityModel[] = [];
}

// City Action Type: 
export enum CityActionType {
    CityDownloaded = "CityDownloaded",
    CityAdded = "CityAdded"
}

// City Action: 
export interface CityAction {
    type: CityActionType;       // Which action are we doing.
    payload: any;               // Which data are we sending to the AppState.
}

// City Reducer (the new CityState() is for the first time only - we create a new AppState):
export function CityReducer(currentState: CityState = new CityState(), action: CityAction): CityState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case CityActionType.CityDownloaded:
            newState.cities = action.payload; // Here action.payload MUST be the downloaded City array!
            break;
        case CityActionType.CityAdded:
            newState.cities.push(action.payload); // Here action.payload MUST be the added product!
            break;
    }

    // Return the new state: 
    return newState;
}
