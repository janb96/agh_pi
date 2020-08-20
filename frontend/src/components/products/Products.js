import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import Product from './Product';

class Products extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            orderDetails: []
        };
        this.addProduct = this.addProduct.bind(this);
        this.loadProducts = this.loadProducts.bind(this);

    }

    loadProducts() {

        if(this.props.categoryID) {
            axios.get(config.apiUrl + "/products/byCategoryID/" + this.props.categoryID).then(
                response => {
                    this.setState({
                        products: response.data.message
                    })
                }
            );
        } else {
            axios.get(config.apiUrl + "/products/visible").then(
                response => {
                    this.setState({
                        products: response.data.message
                    })
                }
            );
        }

    }

    componentDidMount() {
        this.loadProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.categoryID !== this.props.categoryID) {
            this.loadProducts();
        }

    }

    addProduct(productID, quantity, productName, productPrice) {

        let orderDetails = this.state.orderDetails;

        const product = {
            productID: productID,
            quantity: quantity,
            productName: productName,
            productPrice: productPrice
        };

        orderDetails.push(product);

        this.setState({
            orderDetails: orderDetails
        });

        this.props.orderDetailsHandler(orderDetails);
    }

    render() {

        if(this.state.products.length > 0) {
            return(
                <div className="products-selector">
                    <h3>Choose product</h3>
                    <div className="products">
                        {this.state.products.map((value, index) => {
                            return <Product
                                addProduct={this.addProduct}
                                product={value}
                                key={index.toString()}
                                isOrdered={this.props.isOrdered}
                            />
                        })}
                    </div>
                </div>
            );
        } else {
            return(
                <div className="categories-selector">
                    <h3>Choose product</h3>
                    <div className="alert alert-danger">No products found</div>
                </div>
            );
        }

    }

}

export default Products;
