import React, { useState } from 'react';
import {  Redirect } from "react-router-dom";
import { signin } from "../middlewares";
import {isAuthenticated, authenticate} from "../helpers";

import "../App.css";

const Signin = () => {
  const [formdata, setFormdata] = useState({
    email: "case_study@thehuub.io",
    password: "HUUBrocks2020sucks",
    loading: false,
    error: "",
    redirectToReferrer: false
  });
  const {email, password, loading, error, redirectToReferrer} = formdata;
  const {jwt} = isAuthenticated();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata({...formdata, loading: true, error: "" });
    let response = await signin(formdata);
    if(response.message === "Success"){
      authenticate(response.data.jwt, () => {
              setFormdata({ ...formdata, loading: false, redirectToReferrer: true });
        });
    }
    else{
      setFormdata({...formdata, loading: false, error: "Could not Sign in." });
    }
     
  }

  const showError = () => {
    if(error){
      return (
        <div className="alert alert-primary text-center my-3" role="alert">
            {error}
        </div>
      )
    }
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

  const handeChange = (e) =>{
    setFormdata({...formdata, error: "", [e.target.name]: e.target.value });
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
        if (jwt) {
            return <Redirect to="/products" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/products" />;
    }
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto my-5">
                {loader()}
                {showError()}
                {redirectUser()}
              <form onSubmit={handleSubmit} className="my-5">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" value={email} onChange={handeChange}
                        id="email" name="email"  placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handeChange}
                        name="password" id="password" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  {/* {JSON.stringify(formdata)} */}
              </form>
          </div>
        </div>
      </div>
  )
}

export default Signin;

// case_study@thehuub.io
// HUUBrocks2020sucks