import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import Order from './Order';
import Navbar from "../utils/Navbar";

class PaidOrders extends Component {

    constructor() {
        super();
        this.state = {
            paidOrders: [],
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

        axios.get(config.apiUrl + "/orders/paid").then(
            response => {
                this.setState({
                    paidOrders: response.data.message
                })
            }
        );

    }

    render() {

        setTimeout(function(){ window.location.reload(); }, 5000);

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }


        if(this.state.paidOrders.length > 0) {
            return(
                <div className="manage-orders">
                    <Navbar/>
                    <div className="container">
                        <h3><span className="badge badge-info">NEW</span> orders</h3>
                        {this.state.paidOrders.map((value, index) => {
                            return <Order
                                order={value}
                                key={index.toString()}
                            />
                        })}
                    </div>
                </div>
            );
        } else {
            return(
                <div className="manage-orders">
                    <Navbar/>
                    <div className="container">
                        <div className="alert alert-danger">No orders found</div>
                    </div>
                </div>
            );
        }

    }

}

export default PaidOrders;
