import axios from "axios";

export const signin = async (data) => {
    try {
        const response = await axios.post("https://api.brand.uat.thehuub.io/authenticate", data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProducts = async (pageNo, jwt) => {
    try {
        const response = await axios.get(`https://api.brand.uat.thehuub.io/products?page=${pageNo}&page_size=10`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                jwt: `${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}