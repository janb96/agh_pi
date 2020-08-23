import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {

    signOut() {
        window.localStorage.removeItem("token");
        window.location.href = "/login";
    }

    render() {
        return (
            <div className="jumbotron text-center">
                <h1 className="display-3">Employee panel</h1>
                <Link className="btn btn-dark" to="/login">Go back<i className="fas fa-arrow-circle-left"></i></Link>
                <button type="button" className="btn btn-danger" onClick={this.signOut}>
                    Sign out <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        );
    }
}

export default Navbar;
