import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ManageOrdersButtons extends Component {

    constructor() {
        super();
    }

    render() {

        if(this.props.userData.permissionType == 1) {
            return (
                <div className="btn-group-vertical">
                    <Link to="/orders/active" className="btn btn-info">Show active orders</Link>
                    <Link to="/orders/paid" className="btn btn-info">Show paid orders</Link>
                </div>
            );
        }

        if(this.props.userData.permissionType > 1) {
            return (
                <div className="btn-group-vertical">
                    <Link to="/orders/active" className="btn btn-info">Show active orders</Link>
                </div>
            );
        }

        return(<></>);



    }
}

export default ManageOrdersButtons;
