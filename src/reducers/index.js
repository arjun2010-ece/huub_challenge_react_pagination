import { combineReducers } from "redux";

const productsReducer = (products = null, action) => {
    if(action.type === "GET_PRODUCT"){
        return action.payload;
    }
    return products;
}

const selectedProductReducer = (selectedProduct = null, action) => {
   if(action.type === "PRODUCT_SELECTED"){
       return action.payload;
   }
   return selectedProduct;
}


export default combineReducers({
    products: productsReducer,
    selectedProduct: selectedProductReducer
})