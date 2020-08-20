import React, {Component} from 'react';
import {config} from "../../config";

class Product extends Component {

    constructor() {
        super();
        this.state = {
            quantity: 1
        };
        this.chooseProduct = this.chooseProduct.bind(this);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
    }

    chooseProduct() {
        this.props.addProduct(
            this.props.product.productID,
            this.state.quantity,
            this.props.product.productName,
            this.props.product.productPrice
        );
    }

    incrementQuantity() {
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decrementQuantity() {
        if(this.state.quantity >= 2) {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    }

    render() {

        return(
            <div className="product">
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <p>{this.props.product.productName}</p>
                        <p>Price: {this.props.product.productPrice} {config.currency}</p>
                    </div>
                    <div className="col-6 text-center">
                        <div className="row">
                            <div className="col-5">
                                <button className="btn btn-danger" onClick={this.decrementQuantity} disabled={this.props.isOrdered}>
                                    -
                                </button>
                            </div>
                            <div className="col-2">
                                <p>{this.state.quantity}</p>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-success" onClick={this.incrementQuantity} disabled={this.props.isOrdered}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.chooseProduct} disabled={this.props.isOrdered}>
                    Add to order
                </button>
            </div>
        );

    }

}

export default Product;
