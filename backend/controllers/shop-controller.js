const express = require("express");
const shopLogic = require("../business-logic/shop-logic");// business-logic/auth-logic");
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const locations = require("../helpers/locations");
const handleImage = require("../middleware/image-handler");
const CartProductModel = require("../models/cart-product-model");
const OrderModel = require("../models/order-model");
const CityModel = require("../models/city-model");
const ProductCategoryModel = require("../models/Product-category-model");
const CarModelModel = require("../models/car-model-model");
const CarTypeModel = require("../models/car-type-model");
const ReceivedProductsModel = require("../models/received-products-model");
const BarcodeModel = require("../models/barcode-model");

const router = express.Router();
//get all products
router.get("/products", async (request, response) => {
    try {
        const products = await shopLogic.getAllProductsAsync();
        console.log(products)
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//add product
router.post("/products", handleImage, async (request, response) => {
    try {
        console.log(request.body);
        const product = new ProductModel(request.body);

        const returnedProduct = await shopLogic.addProductAsync(product);
        response.json(returnedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/products/:ProductId", async (request, response) => {
    try {
        const ProductId = request.params.ProductId;
        await shopLogic.deleteProductAsync(ProductId);
        response.status(204).send();
    }
    catch (err) {
        response.status(500).send(err.message);
    }

});
//Update a Product
router.put("/products/:productId", handleImage, async (request, response) => {
    try {
        console.log("products put: started ")
        // Model:
        const productId = request.params.productId;
        request.body._id = productId;
        const product = new ProductModel(request.body);

        console.log("products put: object created  ")

        // Validate:
        // const errors = product.validatePut();
        // if (errors) return errorsHelper.badRequestError(response, err);

        // Logic:
        const updatedProduct = await shopLogic.updateProductAsync(product);
        if (!updatedProduct) return response.status(404).send(`id: ${productId} ,not found`);

        // Success:
        response.json(updatedProduct);
    }
    catch (err) {
        errorsHelper.internalServerError(response, err);
    }
});


// get All Categories
router.get("/categories", async (request, response) => {
    try {

        const categories = await shopLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// add Category
router.post("/categories", async (request, response) => {
    try {
        const category = new ProductCategoryModel(request.body);

        if (await shopLogic.checkCategoryExistAsync(category.name))
            errorsHelper.alreadyExistError(response, "Category Already Exist");

        const categories = await shopLogic.addCategoryAsync(category);
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/cart/products/:cartId", async (request, response) => {
    try {
        const cartId = request.params.cartId;
        const cartProducts = await shopLogic.GetAllCartProductsAsync(cartId);
        response.json(cartProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//Get Cart
router.get("/cart/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const cart = await shopLogic.getCartAsync(userId);
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// add product to cart
router.put("/cart", async (request, response) => {
    try {
        console.log(request.body);
        const cartProduct = new CartProductModel(request.body);
        console.log(cartProduct);

        const responseProduct = await shopLogic.addToCartAsync(cartProduct);
        response.json(responseProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/cart/:cartProductId", async (request, response) => {
    try {
        const cartProductId = request.params.cartProductId;
        await shopLogic.deleteFromCartAsync(cartProductId);
        response.status(204).send();
    }
    catch (err) {
        response.status(500).send(err.message);
    }

});
router.get("/order/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;

        const orders = await shopLogic.getAllOrdersAsync(userId);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/order/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const latestOrder = await shopLogic.getLatestOrderAsync(_id);
        response.json(latestOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.post("/order/", async (request, response) => {
    try {
        const order = new OrderModel(request.body);

        // Validate: 
        // const errors = await order.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        const addedOrder = await shopLogic.createOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//get all cites
router.get("/city", async (request, response) => {
    try {
        const cites = await shopLogic.getAllCitesAsync();
        response.json(cites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/city", async (request, response) => {
    try {
        const city = new CityModel(request.body);

        // Validate: 
        // const errors = await city.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        if (await shopLogic.checkCityExistAsync(city.name))
            errorsHelper.alreadyExistError(response, "Category Already Exist");

        const responseCity = await shopLogic.addCityAsync(city);
        response.json(city);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// //gets all the product's categories
// router.get("/product/category", async (request, response) => {
//     try {
//         const productCategory = await shopLogic.getAllProductCategoryAsync();
//         response.json(productCategory);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });
// //adds new product category
// router.post("/product/category", async (request, response) => {
//     try {
//         const productCategory = new ProductCategoryModel(request.body);

//         // Validate: 
//         // const errors = await city.validateSync();
//         // if (errors) return response.status(400).send(errors.message);

//         const responseCity = await shopLogic.addProductCategoryAsync(productCategory);
//         response.json(city);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });
// //deletes a product category 
// router.delete("/product/category/:productCategory_id", async (request, response) => {
//     try {
//         const productCategory_id = request.params.productCategory_id;
//         await shopLogic.deleteProductCategoryAsync(productCategory_id);
//         response.status(204).send();
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });
//gets all the Bar codes 
router.get("/barcode/", async (request, response) => {
    try {
        const ReturnedBarCodes = await shopLogic.getAllBarcodeAsync();
        response.json(ReturnedBarCodes);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//gets the Bar codes 
router.get("/barcode/:barcode_name", async (request, response) => {
    try {
        const barcode = request.params.barcode_name;
        const ReturnedBarcode = await shopLogic.getBarcodeAsync(barcode);
        response.json(ReturnedBarcode);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//adds the Bar codes
router.post("/barcode/", async (request, response) => {
    try {
        console.log(request.body)
        var barcode = new BarcodeModel(request.body)

        if (await shopLogic.checkBarcodeExistAsync(barcode.product_id))
            errorsHelper.alreadyExistError(response, "Already Exist!")

        const ReturnedBarcode = await shopLogic.addBarcodeAsync(barcode);
        response.json(ReturnedBarcode);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//gets all the car models 
router.get("/carModel", async (request, response) => {
    try {
        const carModel = await shopLogic.getAllCarModelAsync();
        response.json(carModel);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//adds a new car model 
router.post("/carModel", async (request, response) => {
    try {
        const carModel = new CarModelModel(request.body);


        // Validate: 
        // const errors = await city.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        if (await shopLogic.checkCarModelExistAsync(carModel.name))
            errorsHelper.alreadyExistError(response, "Car Model Already Exist");

        const responseCarModel = await shopLogic.addCarModelAsync(carModel);
        response.json(responseCarModel);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//deletes a car model 
router.delete("/carModel/:carModel_id", async (request, response) => {
    try {
        const carModel_id = request.params.carModel_id;
        await shopLogic.deleteCarModelAsync(carModel_id);
        response.status(204).send();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// gets all the car types
router.get("/carType", async (request, response) => {
    try {
        // console.log("carType");

        const carType = await shopLogic.getAllCarTypeAsync();
        // console.log(carType)
        response.json(carType);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//adds car type
router.post("/carType", async (request, response) => {
    try {
        const carType = new CarTypeModel(request.body);

        // Validate: 
        // const errors = await city.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        if (await shopLogic.checkCarTypeExistAsync(carType.name, carType.year))
            errorsHelper.alreadyExistError(response, "Car Type Already Exist");

        const responseCarType = await shopLogic.addCarTypeAsync(carType);
        console.log("fdsgrfgasfdg");
        response.json(responseCarType);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//deletes a car type
router.delete("/carType/:carType_id", async (request, response) => {
    try {
        const carModel_id = request.params.carType_id;
        await shopLogic.deleteCarTypeAsync(carModel_id);
        response.status(204).send();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// get all the sold products 
router.get("/soldProducts ", async (request, response) => {
    try {
        const soldProducts = await shopLogic.getAllSoldProductsAsync();
        response.json(soldProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// returns the sold products in the specified range
router.get("/soldProducts?startDate=:startDate&endDate=:endDate", async (request, response) => {
    try {
        const startDate = request.params.startDate;
        const endDate = request.params.endDate;
        const soldProducts = await shopLogic.getSoldProductsInRangeAsync(startDate, endDate);
        response.json(soldProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//adds a new product sold 
router.post("/soldProducts", async (request, response) => {
    try {
        const soldProducts = new CityModel(request.body);

        // Validate: 
        // const errors = await soldProducts.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        const responseSoldProducts = await shopLogic.addSoldProductAsync(soldProducts);
        response.json(responseSoldProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//gets all the received products 
router.get("/receivedProducts ", async (request, response) => {
    try {
        const cites = await shopLogic.getAllReceivedProductsAsync();
        response.json(cites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//gets the received products in the specified range
router.get("/receivedProducts?startDate=:startDate&endDate=:endDate", async (request, response) => {
    try {
        const startDate = request.params.startDate;
        const endDate = request.params.endDate;
        const receivedProducts = await shopLogic.getReceivedProductsInRangeAsync(startDate, endDate);
        response.json(receivedProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//adds a new product received 
router.post("/receivedProducts", async (request, response) => {
    try {
        const receivedProduct = new ReceivedProductsModel(request.body);

        // Validate: 
        // const errors = await city.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        const responseReceivedProduct = await shopLogic.addReceivedProductAsync(receivedProduct);
        response.json(responseReceivedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.purge("/AddingDataFunction", async (request, response) => {
    try {
        console.log("hello from here");

        response.json(220);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;