import { CarTypeModel } from '../models/car-type.model';

// CarType App State: 
export class CarTypeState {
    public CarTypes: CarTypeModel[] = [];
}

// CarType Action Type: 
export enum CarTypeActionType {
    CarTypeDownloaded = "CarTypeDownloaded",
    CarTypeAdded = "CarTypeAdded"
}

// CarType Action: 
export interface CarTypeAction {
    type: CarTypeActionType;       // Which action are we doing.
    payload: any;               // Which data are we sending to the AppState.
}

// CarType Reducer (the new CarTypeState() is for the first time only - we create a new AppState):
export function CarTypeReducer(currentState: CarTypeState = new CarTypeState(), action: CarTypeAction): CarTypeState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case CarTypeActionType.CarTypeDownloaded:
            newState.CarTypes = action.payload; // Here action.payload MUST be the downloaded CarType array!
            break;
        case CarTypeActionType.CarTypeAdded:
            newState.CarTypes.push(action.payload); // Here action.payload MUST be the added product!
            break;
    }

    // Return the new state: 
    return newState;
}
