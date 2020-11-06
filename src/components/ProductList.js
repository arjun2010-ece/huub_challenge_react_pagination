import React, { useEffect, useState, Fragment, useLayoutEffect } from 'react';
import Product from './Product';
import {loadProducts} from "../actions";
import {isAuthenticated} from "../helpers";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import ReactPaginate from 'react-paginate';


const ProductList = ({loadProducts, products, pageCount}) => {
    let localPage = parseInt(JSON.parse(localStorage.getItem("page")));
    const [pageNo, setPageNo] = useState(localPage || 1);
    const [loading, setLoading] = useState(true);
    const jwt = isAuthenticated();
    const [size, setSize] = useState(0);

    // const pageRef = useRef();

    useEffect(() => {
        if(pageNo > 0){
            const fetchProduct = async () => {
                await loadProducts(pageNo, jwt, () => {
                    setLoading(false);
                })
                localStorage.setItem("page", pageNo);
            }
            fetchProduct();
        }
    }, [pageNo, loadProducts, jwt])

    useLayoutEffect(() => {
        function updateSize() {
          setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);

    const redirectUser = () => {
            if (!jwt) {
                return <Redirect to="/" />;
            }
      };
    
    const handlePageClick = async ({selected}) => {
        let page = selected + 1;
        window.scroll(0, 0);
        setPageNo(page);
    }

    const loader =() => {
        if(loading){
          return (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
        }
    }
    const handlePaginationSize = (marginPage, pageRange) => {
        if(marginPage === "marginPage"){
            if(size > 1200) return 3;
            if(size > 991 && size <= 1200) return 3;
            if(size >= 768 && size <= 991) return 3;
            if(size >= 576 && size < 768) return 3;
            if(size >= 320 && size < 576) return 1;
        }
        else{
            if(size > 1200) return 11;
            if(size > 991 && size <= 1200) return 8;
            if(size >= 768 && size <= 991) return 3;
            if(size >= 576 && size < 768) return 5;
            if(size >= 320 && size < 576) return 1;
        }
    }
    // handlePaginationSize("marginPage")
    // handlePaginationSize(null, "pageRange")
    const paginationComponent = (products, pageCount) => (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={handlePaginationSize("marginPage")}
            pageRangeDisplayed={handlePaginationSize(null, "pageRange")}
            onPageChange={handlePageClick}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination hidden-xs'}
            subContainerClassName={'pages pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
            initialPage={pageNo-1}
        />
    );

    const getProducts = () => {
    if(products && pageCount){
        return (
            <>
                <h3 className="text-center">Products page</h3>
                {
                    products?.map((p, i) => (
                        <Fragment key={i}>
                            <Product product={p} />
                        </Fragment>
                    ))
                }
                {paginationComponent(products, pageCount)}
            </>
        )
    }
    }
    
    return (
        <div className="container products">
            <div className="row">
                <div className="col-md-8  offset-md-2 my-5">
                    {redirectUser()}
                    {loader()}
                    {getProducts()}           
                </div>
            </div>
        </div>
    )
}

const getState = state => {
    return {
        products: state?.products?.data,
        pageCount: state?.products?.paginator?.total_pages
    }
}
export default connect(getState, {loadProducts})(ProductList);