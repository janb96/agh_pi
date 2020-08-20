import React, {Component} from 'react';
import {config} from './../../config';
import "./CustomerOrder.css";

class CustomerOrder extends Component {

    constructor() {
        super();
        this.state = {
        };
        this.getAlertStyle = this.getAlertStyle.bind(this);
    }

    getAlertStyle() {
        if(this.props.isOrdered) {
            return "alert alert-success";
        } else {
            return "alert alert-info";
        }
    }


    render() {

        if(this.props.orderDetails.length > 0) {
            return(
                <div className="restaurant-order">
                    <div className={this.getAlertStyle()}>
                        <p><strong>Your order:</strong> <i onClick={this.props.clearOrderDetails} className="fas fa-trash-alt"></i></p>
                        {this.props.orderDetails.map((value, index) => {
                            return <p
                                key={index.toString()}
                            >{value.quantity}x {value.productName} (price: {value.productPrice * value.quantity} {config.currency})</p>
                        })}
                        <p>Total price: {this.props.totalPrice} {config.currency}</p>
                        <button className="btn btn-success" onClick={this.props.makeOrder} disabled={this.props.isOrdered}>
                            Order
                        </button>
                    </div>
                </div>
            );
        } else {
            return(
              <></>
            );
        }


    }

}

export default CustomerOrder;
