import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import EditProduct from "./EditProduct";

class EditProducts extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get(config.apiUrl + "/products").then(
            response => {
                this.setState({
                    products: response.data.message
                })
            });
    }

    render() {

        if(this.state.products.length > 0) {
            return(
                <div className="products-edit">
                    <h3>Choose product</h3>
                    <div className="products">
                        {this.state.products.map((value, index) => {
                            return <EditProduct
                                productID={value.productID}
                                productName={value.productName}
                                productPrice={value.productPrice}
                                categoryID={value.categoryID}
                                productDescription={value.productDescription}
                                productImageUrl={value.productImageUrl}
                                isVisible={value.isVisible}
                                isRecommended={value.isRecommended}
                                key={index.toString()}
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

export default EditProducts;
