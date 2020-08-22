import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import Order from './Order';

class Orders extends Component {

    constructor() {
        super();
        this.state = {
            newOrders: [],
            readyOrders: [],
            deliveredOrders: [],
            isLogin: "",
            userData: null
        };
        this.checkEmployeeToken = this.checkEmployeeToken.bind(this);
    }

    async checkEmployeeToken() {
        let response = await axios.get(config.apiUrl + "/employees/checkEmployeeToken");
        this.setState({
            isLogin: response.data.status
        });
    }

    componentDidMount() {

        this.checkEmployeeToken();

        axios.get(config.apiUrl + "/orders/byOrderStatus/NEW").then(
            response => {
                this.setState({
                    newOrders: response.data.message
                })
            }
        );

        axios.get(config.apiUrl + "/orders/byOrderStatus/READY").then(
            response => {
                this.setState({
                    readyOrders: response.data.message
                })
            }
        );

        axios.get(config.apiUrl + "/orders/byOrderStatus/DELIVERED").then(
            response => {
                this.setState({
                    deliveredOrders: response.data.message
                })
            }
        );

    }

    render() {

        setTimeout(function(){ window.location.reload(); }, 5000);

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }


        if(this.state.newOrders.length > 0
            || this.state.readyOrders.length > 0
            || this.state.deliveredOrders.length > 0) {
            return(
                <div className="manage-orders">
                    <div className="row">
                        <div className="col-md-4">
                            <h3><span className="badge badge-info">NEW</span> orders</h3>
                            {this.state.newOrders.map((value, index) => {
                                return <Order
                                    order={value}
                                    key={index.toString()}
                                />
                            })}
                        </div>
                        <div className="col-md-4">
                            <h3><span className="badge badge-warning">READY</span> orders</h3>
                            {this.state.readyOrders.map((value, index) => {
                                return <Order
                                    order={value}
                                    key={index.toString()}
                                />
                            })}
                        </div>
                        <div className="col-md-4">
                            <h3><span className="badge badge-success">DELIVERED</span> orders</h3>
                            {this.state.deliveredOrders.map((value, index) => {
                                return <Order
                                    order={value}
                                    key={index.toString()}
                                />
                            })}
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="categories-selector">
                    <div className="alert alert-danger">No orders found</div>
                </div>
            );
        }

    }

}

export default Orders;
