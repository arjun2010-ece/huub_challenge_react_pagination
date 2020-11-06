import React from "react";
import {isAuthenticated, logout} from "../helpers";
import {Link, withRouter} from "react-router-dom";

const Navbar = ({history}) => {
    const handleLogout = () => {
        logout();
        history.push("/");
    }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="!#">
        HUUB
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav ml-auto">

            {
                !isAuthenticated() && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Login
                        </Link>
                    </li>
                )
            }
            {
                isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor: "pointer"}} onClick={handleLogout}>
                                Logout
                            </span>
                        </li>
                )
            }
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
