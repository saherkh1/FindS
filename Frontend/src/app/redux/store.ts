import { combineReducers, createStore } from "redux";
import { AuthReducer } from "./auth-state";
import { BarcodeReducer } from "./barcode-state";
import { CarModelReducer } from "./car-model-state";
import { CarTypeReducer } from "./car-type-state";
import { CartReducer } from "./cart-state";
import { CategoryReducer } from "./category-state";
import { CityReducer } from "./city-state";
import { ProductsReducer } from "./products-state";
import { SearchReducer } from "./search-state";

// Create an object containing all the reducers: 
const reducers = combineReducers({
    productsState: ProductsReducer,
    categoryState: CategoryReducer,
    cartState: CartReducer,
    authState: AuthReducer,
    searchState: SearchReducer,
    carTypeState: CarTypeReducer,
    carModelState: CarModelReducer,
    barcodeState: BarcodeReducer,
    cityState: CityReducer,

});

// Crete the store object:
const store = createStore(reducers);

// Export the store:
export default store;
