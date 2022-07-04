const baseUrl = "http://localhost:3001/api/";

export const environment = {
    production: false,
    validationUrl: baseUrl + "auth/register/validation/",
    receivedProducts: baseUrl + "receivedProducts/",
    productCategoryUrl: baseUrl + "categories/",
    cartProductsUrl: baseUrl + "cart/products/",
    registerUrl: baseUrl + "auth/register/",
    productImagesUrl: baseUrl + "images/",
    cartTotalUrl: baseUrl + "cart/total/",
    carModelUrl: baseUrl + "carModel/",
    productsUrl: baseUrl + "products/",
    barcodeUrl: baseUrl + "barcode/",
    carTypeUrl: baseUrl + "carType/",
    loginUrl: baseUrl + "auth/login",
    cityUrl: baseUrl + "city/",
    cartUrl: baseUrl + "cart/",
    order: baseUrl + "order/",
}

export const ApplicationConstants = {
    superMarketName: "FindS",

}