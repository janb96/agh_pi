import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ManageRestaurantButtons extends Component {

    constructor() {
        super();
    }

    render() {

        if(this.props.userData.permissionType == 1) {
            return (
                <div className="btn-group-vertical">
                    <Link to="/table/add" className="btn btn-success">Add table</Link>
                    <Link to="/category/add" className="btn btn-success">Add category</Link>
                    <Link to="/product/add" className="btn btn-success">Add product</Link>
                    <Link to="/employee/add" className="btn btn-success">Add employee</Link>
                    <Link to="/table/edit" className="btn btn-warning">Edit table</Link>
                    <Link to="/category/edit" className="btn btn-warning">Edit category</Link>
                    <Link to="/product/edit" className="btn btn-warning">Edit product</Link>
                </div>
            );
        }

        if(this.props.userData.permissionType == 2) {
            return (
                <div className="btn-group-vertical">
                    <Link to="/table/edit" className="btn btn-warning">Edit table</Link>
                    <Link to="/product/edit" className="btn btn-warning">Edit product</Link>
                </div>
            );
        }

        if(this.props.userData.permissionType == 3) {
            return (
                <div className="btn-group-vertical">
                    <Link to="/product/edit" className="btn btn-warning">Edit product</Link>
                </div>
            );
        }

        return(<></>);



    }
}

export default ManageRestaurantButtons;
