import React, {Component} from 'react';
import axios from "axios";
import {config} from "../../config";

class OrderDetails extends Component {

    constructor() {
        super();
        this.state = {
            product: {
                productName: "pending..."
            }
        };
    }

    componentDidMount() {

        axios.get(config.apiUrl + "/products/byProductID/" + this.props.orderDetails.productID).then(
            response => {
                this.setState({
                    product: response.data.message
                })
            }
        );

    }

    render() {

        return(
            <div className="order-detail">
                <p>{this.props.orderDetails.quantity} x Product: {this.state.product.productName}</p>
            </div>
        );

    }

}

export default OrderDetails;
