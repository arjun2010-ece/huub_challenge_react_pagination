import React from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {selectedProduct} from "../actions"

const Product = ({product, history, selectedProduct}) => {
    const handleClick = (e) => { 
       localStorage.setItem("product", JSON.stringify(product));
       history.push("/product/details");
       selectedProduct(product);
    }   
    return (
        <div className="card my-5" onClick={handleClick} style={{cursor: "pointer"}}>
            <div className="card-body">
                <h5 className="card-title">Product Name : {product.name}</h5>
                <p className="card-text">Product Code: {product.id}</p>
            </div>
        </div>
    )
}
export default connect(null, {selectedProduct})(withRouter(Product));