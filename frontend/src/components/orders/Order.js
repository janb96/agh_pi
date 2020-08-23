import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import OrderDetails from "./OrderDetails";
import ApiResponse from './../utils/ApiResponse';

class Order extends Component {

    constructor() {
        super();
        this.state = {
            tableName: "pending...",
            orderDetails: [],
            apiResponse: "",
            status: ""
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.getAlertStyle = this.getAlertStyle.bind(this);
        this.makePaid = this.makePaid.bind(this);
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

                if(response.data.status){
                    setTimeout(function(){ window.location.reload(); }, 1000);
                }

                this.setState({
                    status: response.data.status,
                    apiResponse: response.data.message
                })
            }
        );
    }

    makePaid() {

        const putData = {
            orderID: this.props.order.orderID,
            isPaid: 1
        };

        axios.put(config.apiUrl + "/orders/isPaid", putData).then(
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
                <h5>Paid: {this.props.order.isPaid.toString()}</h5>
                <button className="btn btn-info" onClick={this.changeStatus} id="NEW">
                    NEW
                </button>
                <button className="btn btn-warning" onClick={this.changeStatus} id="READY">
                    READY
                </button>
                <button className="btn btn-success" onClick={this.changeStatus} id="DELIVERED">
                    DELIVERED
                </button>
                <button className="btn btn-outline-danger" onClick={this.changeStatus} id="CLOSED">
                    CLOSED
                </button>
                <button className="btn btn-outline-dark" onClick={this.makePaid}>
                    Paid
                </button>
                <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
            </div>
        );

    }

}

export default Order;
