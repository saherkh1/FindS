const CityModel = require("../models/city-model");
const CartModel = require("../models/cart-model");
const ProductModel = require("../models/product-model");
const CartProductModel = require("../models/cart-product-model");
const ProductCategoryModel = require("../models/Product-category-model");
const ImageHelper = require("../helpers/image-helper");
const CarModelModel = require("../models/car-model-model");
const CarTypeModel = require("../models/car-type-model");
const SoldProductsModel = require("../models/sold-products-model");
const ReceivedProductsModel = require("../models/received-products-model");
const BarcodeModel = require("../models/barcode-model");

//product
function getAllProductsAsync() {
    return ProductModel.find().populate("category").populate("carType").exec();
}

async function addProductAsync(product) {
    return product.save();
}

async function updateProductQuantity(ProductId, soldQuantity) {
    const product = await getProductByIdAsync(ProductId);
    product.stockQuantity -= soldQuantity;
    if (product.stockQuantity < 0) throw ("No sufficient quantity for the product: " + product.name)
    // console.log("updateProductQuantity: first step done");
}
async function getProductByIdAsync(ProductId) {
    return ProductModel.find(ProductId).populate("category").populate("carType").exec();
}
function deleteProductAsync(ProductId) {
    return ProductModel.findByIdAndDelete(ProductId);
}
async function updateProductAsync(newProduct) {
    const products = await getAllProductsAsync();
    const oldProduct = products.find(p => p._id.equals(newProduct._id));
    if (!oldProduct) return null;
    if (newProduct.image)
        if (oldProduct.image !== newProduct.image)
            ImageHelper.deleteOldImage(oldProduct.image);
    return ProductModel.findByIdAndUpdate(newProduct._id, newProduct, { returnOriginal: false }).exec();
    // return ProductModel.findOneAndUpdate(newProduct._id, newProduct, { returnOriginal: false }).exec();
}

//cart
async function getCartAsync(userId) {
    const cart = await CartModel.findOne({ userId }, {}, { sort: { createDate: -1 } }).populate("cartProducts").exec();
    if (cart === null) cart = createNewCart(userId);
    else return cart;
    return cart.save();
}

async function addToCartAsync(cartProduct) {

    cartProduct = await cartProduct.populate("product");
    cartProduct.itemsPrice = cartProduct.quantity * cartProduct.product.price;
    const foundCartProduct = await CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).populate("product").exec();
    if (foundCartProduct) {
        return foundCartProduct
    }
    return cartProduct.save();
}
function deleteFromCartAsync(cartProductId) {
    return CartProductModel.findByIdAndDelete(cartProductId);
}
// get all products that have been added to this cart
function GetAllCartProductsAsync(cartId) {
    return CartProductModel.find({ cartId }).populate("product").exec();
}
function updateCartProductAsync(cartProduct) {
    return CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).exec();
}

function createNewCart(userId) {
    const date = new Date();
    cart = new CartModel({ userId: userId, createDate: date });
    return cart.save();
}

async function addSoldProduct(user_id, product_id, quantity, totalPrice) {
    const soldProduct = new SoldProductsModel();
    soldProduct.user_id = user_id;
    soldProduct.product_id = product_id;
    soldProduct.quantity = quantity;
    soldProduct.totalPrice = totalPrice;
    if (!soldProduct.soledDate) soldProduct.soledDate = Date.now;
    console.log("createOrderAsync: Third step done");
    return soldProduct.save
}

//order
async function createOrderAsync(order) {
    //get the cart 
    const cart = await getCartAsync(order.user_id);
    //for each cart product update the product quantity to be the old q - new q 
    //add product to sold products 
    cart.cartProducts.forEach(cartProduct => {
        // console.log("createOrderAsync: second step done");
        updateProductQuantity(cartProduct.product_id, cartProduct.quantity);
        addSoldProduct(order.user_id, cartProduct.product_id, cartProduct.quantity, cartProduct.totalPrice)
        // console.log("createOrderAsync: fourth step done");
    });
    createNewCart(order.user_id)
    order.orderDate = new Date();
    return order.save();
}

function getAllOrdersAsync(userId) {
    return OrderModel.find({ userId }).sort({ initDate: 'desc' }).populate("cart").populate("city").exec();
}
function getAllBarcodeAsync() {
    return BarcodeModel.find().exec();
}
function getBarcodeAsync(barcode_name) {
    return BarcodeModel.find({ barcode_name }).exec();
}
function addBarcodeAsync(barcode) {
    return barcode.save();
}

function getLatestOrderAsync(userId) {
    return OrderModel.findOne({ userId }).sort({ initDate: 'desc' }).populate("cart").populate("city").exec();
}


//Categories
function getAllCategoriesAsync() {
    return ProductCategoryModel.find().exec();
}

function addCategoryAsync(category) {
    return category.save();
}

// city 
function getAllCitesAsync() {
    return CityModel.find().exec();
}
function addCityAsync(city) {
    return city.save();
}
function getAllProductCategoryAsync() {
    return ProductCategoryModel.find().exec();
}
function addProductCategoryAsync(productCategory) {
    return productCategory.save();
}
function deleteProductCategoryAsync(productCategory_id) {
    return ProductCategoryModel.findByIdAndDelete(productCategory_id);
}
function getAllCarModelAsync() {
    return CarModelModel.find().exec();
}
function addCarModelAsync(carModel) {
    return carModel.save();
}
function deleteCarModelAsync(carModel_id) {
    return CarModelModel.findByIdAndDelete(carModel_id);
}

function getAllCarTypeAsync() {
    return CarTypeModel.find().populate("carModel").exec();
}
function addCarTypeAsync(carType) {
    // console.log(carType)
    return carType.save();
}
function deleteCarTypeAsync(carType_id) {
    return CarTypeModel.findByIdAndDelete(carType_id);
}

function getAllSoldProductsAsync() {
    return SoldProductsModel.find().exec();
}
function getSoldProductsInRangeAsync(startDate, endDate) {
    SoldProductsModel.find({ //query today up to tonight
        created_on: {
            $gte: startDate,
            $lt: endDate
        }
    })
    return carType.save();
}
function addSoldProductAsync(soldProducts) {
    return soldProducts.save();
}

function getAllReceivedProductsAsync() {
    return ReceivedProductsModel.find().exec();
}
function getReceivedProductsInRangeAsync(startDate, endDate) {
    ReceivedProductsModel.find({ //query today up to tonight
        created_on: {
            $gte: startDate,
            $lt: endDate
        }
    })
    return carType.save();
}

function addReceivedProductAsync(receivedProduct) {
    return receivedProduct.save();
}
function checkBarcodeExistAsync(product_id) {
    const barCodes = BarcodeModel.find({ product_id }).exec();
    return barCodes.length >= 0;
}
function checkCarModelExistAsync(name) {
    return (CarModelModel.find({ name }).exec()).length >= 0;
}
function checkCategoryExistAsync(name) {
    return (ProductCategoryModel.find({ name }).exec()).length >= 0;
}
function checkCityExistAsync(name) {
    return (CityModel.find({ name }).exec()).length >= 0;
}
function checkCarTypeExistAsync(name, year) {
    return (CarTypeModel.find({ name, year }).exec()).length >= 0;
}
module.exports = {
    checkCarTypeExistAsync,
    checkCityExistAsync,
    checkCategoryExistAsync,
    getAllProductsAsync,
    addProductAsync,
    deleteProductAsync,
    updateProductAsync,
    getCartAsync,
    addToCartAsync,
    deleteFromCartAsync,
    GetAllCartProductsAsync,
    createOrderAsync,
    getAllCitesAsync,
    addCityAsync,
    getAllCategoriesAsync,
    addCategoryAsync,
    getLatestOrderAsync,
    getAllOrdersAsync,
    getAllBarcodeAsync,
    getBarcodeAsync,
    addBarcodeAsync,
    checkBarcodeExistAsync,
    getAllProductCategoryAsync,
    addProductCategoryAsync,
    deleteProductCategoryAsync,

    getAllCarModelAsync,
    addCarModelAsync,
    deleteCarModelAsync,
    checkCarModelExistAsync,
    getAllCarTypeAsync,
    addCarTypeAsync,
    deleteCarTypeAsync,
    getAllSoldProductsAsync,
    getSoldProductsInRangeAsync,
    addSoldProductAsync,
    getAllReceivedProductsAsync,
    getReceivedProductsInRangeAsync,
    addReceivedProductAsync,

}