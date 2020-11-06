import axios from "axios";

// Action creator
export const loadProducts = (pageNo, jwt, next) => async dispatch => {
    try {
            const response = await axios.get(`https://api.brand.uat.thehuub.io/products?page=${pageNo}&page_size=10`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    jwt: `${jwt}`
                }
            });
            next();
            localStorage.setItem("product_response", JSON.stringify(response.data));
            dispatch({ type: "GET_PRODUCT", payload: response.data });
        
    } catch (error) {
        console.log(error);
    }
}

export const selectedProduct = (product) => {
    return {
        type: "PRODUCT_SELECTED",
        payload: product
    };
}
