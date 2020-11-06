import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signin from './components/Signin';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';


const Routes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/products" exact component={ProductList} />
                    <Route path="/product/details" exact component={ProductDetails} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default Routes;