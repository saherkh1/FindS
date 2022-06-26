import { BarcodeModel } from '../models/barcode.model';

// Barcode App State: 
export class BarcodeState {
    public BarCodes: BarcodeModel[] = [];
}

// Barcode Action Type: 
export enum BarcodeActionType {
    BarcodeDownloaded = "BarcodeDownloaded",
    BarcodeAdded = "BarcodeAdded"
}

// Barcode Action: 
export interface BarcodeAction {
    type: BarcodeActionType;       // Which action are we doing.
    payload: any;               // Which data are we sending to the AppState.
}

// Barcode Reducer (the new BarcodeState() is for the first time only - we create a new AppState):
export function BarcodeReducer(currentState: BarcodeState = new BarcodeState(), action: BarcodeAction): BarcodeState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case BarcodeActionType.BarcodeDownloaded:
            newState.BarCodes = action.payload; // Here action.payload MUST be the downloaded Barcode array!
            break;
        case BarcodeActionType.BarcodeAdded:
            newState.BarCodes.push(action.payload); // Here action.payload MUST be the added product!
            break;
    }

    // Return the new state: 
    return newState;
}
