import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import OrderDetails from "./OrderDetails";

class Order extends Component {

    constructor() {
        super();
        this.state = {
            tableName: "pending...",
            orderDetails: []
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.getAlertStyle = this.getAlertStyle.bind(this);
    }

    componentDidMount() {

        axios.get(config.apiUrl + "/tables/byTableID/" + this.props.order.tableID).then(
            response => {
                let table = response.data.message;
                let tableName = table[0].tableName;
                this.setState({
                    tableName: tableName
                })
            }
        );

        axios.get(config.apiUrl + "/orders/orderDetails/byOrderID/" + this.props.order.orderID).then(
            response => {
                this.setState({
                    orderDetails: response.data.message
                })
            }
        );

    }

    getAlertStyle() {
        if(this.props.order.orderStatus === "NEW") {
            return "alert alert-info";
        } else if(this.props.order.orderStatus === "READY"){
            return "alert alert-warning";
        } else {
            return "alert alert-success";
        }
    }

    changeStatus(event) {
        let orderStatus = event.target.id;

        const putData = {
            orderID: this.props.order.orderID,
            orderStatus: orderStatus
        };

        axios.put(config.apiUrl + "/orders/changeStatus/", putData).then(
            response => {
                window.location.reload();
            }
        );
    }

    render() {

        return(
            <div className={this.getAlertStyle()}>
                <h5>Order: {this.props.order.orderID}</h5>
                <h6>Table: {this.state.tableName}</h6>
                <h6>Order value: {this.props.order.orderPrice} ({config.currency})</h6>
                <h5>Order details:</h5>
                {this.state.orderDetails.map((value, index) => {
                    return <OrderDetails
                        orderDetails={value}
                        key={index.toString()}
                    />
                })}
                <button className="btn btn-info" onClick={this.changeStatus} id="NEW">
                    NEW
                </button>
                <button className="btn btn-warning" onClick={this.changeStatus} id="READY">
                    READY
                </button>
                <button className="btn btn-success" onClick={this.changeStatus} id="DELIVERED">
                    DELIVERED
                </button>
            </div>
        );

    }

}

export default Order;
