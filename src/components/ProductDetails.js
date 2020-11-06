import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const ProductDetails = ({product}) => {
    const [productData,] = useState(() => product || JSON.parse(localStorage.getItem("product")))
    
    const handleVariants = (variants) => {
        const variant = variants.map(vari => vari?.ean);
        var variantString = variant.join(",");
        return (<span>{variantString}</span>);
    }
    return (
    <div className="container product-container">
        <div className="row">
            <div className="col-sm-12">
                <div className="back">
                    <Link className="btn btn-primary" to="/products">Back</Link>
                </div>
                <div className="product-details">
                <div className="card my-5" style={{width: "25rem"}}>
                    <div className="card-body">
                        <h3 className="card-title">Product Details</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Name:</b> {productData?.name}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b> {productData?.description}
                            </li>
                            <li className="list-group-item">
                                <b>Type:</b> {productData?.type}
                            </li>
                            <li className="list-group-item">
                                <b>Family:</b> {productData?.family}
                            </li>
                            <li className="list-group-item">
                                <b>Sub-family:</b> {productData?.subfamily}
                            </li>
                            <li className="list-group-item">
                                <b>Season:</b> {productData?.season}
                            </li>
                            <li className="list-group-item">
                                <b>supplier:</b> {productData?.supplier ? productData?.supplier: "Not Available" }
                            </li>
                            <li className="list-group-item">
                                <b>Variants(by ean):</b> {productData?.variants?.length > 0 ? handleVariants(productData?.variants): "Not Available"}
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return {
        product: state?.selectedProduct
    }
}

export default connect(mapStateToProps)(ProductDetails);