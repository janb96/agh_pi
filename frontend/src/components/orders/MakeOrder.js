import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import Menu from './../menu/Menu';
import CustomerOrder from "./CustomerOrder";

class MakeOrder extends Component {

    constructor() {
        super();
        this.state = {
            tableID: null,
            orderDetails: [],
            isOrdered: false
        };
        this.setOrderDetails = this.setOrderDetails.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.clearOrderDetails = this.clearOrderDetails.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }

    setOrderDetails(orderDetails) {
        this.setState({
            orderDetails: orderDetails
        });
    }

    getTotalPrice() {
        let totalPrice = 0;
        for(let orderItem of this.state.orderDetails) {
            totalPrice += orderItem.productPrice * orderItem.quantity;
        }
        return totalPrice;
    }

    componentDidMount() {

        let { tableID } = this.props.match.params;

        this.setState({
            tableID: tableID
        });

        const putData = {
            tableID: parseInt(tableID)
        };

        axios.put(config.apiUrl + "/tables/useTable", putData);

    }

    makeOrder() {

        const order = {
            tableID: parseInt(this.state.tableID),
            orderDetails: this.state.orderDetails
        };

        axios.post(config.apiUrl + "/orders", order).then(
            response => {
                if(response.data.status){
                    this.setState({
                        isOrdered: true
                    });
                }
            }
        );

    }

    clearOrderDetails() {
        if(!this.state.isOrdered) {
            window.location.reload();
        }
    }

    render() {

        return(
            <div className="make-order">
                <div className="jumbotron text-center">
                    <h1 className="display-3">Create your order</h1>
                </div>
                <div className="container">
                    <CustomerOrder
                        isOrdered={this.state.isOrdered}
                        orderDetails={this.state.orderDetails}
                        totalPrice={this.getTotalPrice()}
                        makeOrder={this.makeOrder}
                        clearOrderDetails={this.clearOrderDetails}
                    />
                    <Menu
                        setOrderDetails={this.setOrderDetails}
                        isOrdered={this.state.isOrdered}
                    />
                </div>
            </div>
        );

    }

}

export default MakeOrder;
