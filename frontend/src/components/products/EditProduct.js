import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productID: this.props.productID,
            productName: this.props.productName,
            productPrice: this.props.productPrice,
            categoryID: this.props.categoryID,
            productDescription: this.props.productDescription,
            productImageUrl: this.props.productImageUrl,
            isVisible: this.props.isVisible,
            isRecommended: this.props.isRecommended,
            categories: [],
            apiResponse: "",
            status: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        axios.get(config.apiUrl + "/categories").then(
            response => {
                this.setState({
                    categories: response.data.message
                });

            });

    }

    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            productID: this.state.productID,
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            categoryID: this.state.categoryID,
            productDescription: this.state.productDescription,
            productImageUrl: this.state.productImageUrl,
            isVisible: this.state.isVisible,
            isRecommended: this.state.isRecommended,
        };
        axios.put(config.apiUrl + "/products", putData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    setTimeout(function(){ window.location.reload(); }, 1000);
                    this.setState({
                        apiResponse: "Product created",
                        status: response.data.status
                    });
                }
            }
        );
    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
    }

    handleChangeRadio(event) {
        let stateName = event.target.name;
        this.setState({
            [stateName]: event.target.value
        });
    }

    render() {

        return (
            <div className="restaurant-manage-form">
                <hr/>
                <h3>Edit product (productID: {this.props.productID} productName: {this.props.productName})</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Choose product category</label>
                        <select  onChange={this.handleChange} className="form-control" id="categoryID">
                            <option value="" selected>
                                Choose product category
                            </option>
                            {this.state.categories.map((value, index) => {
                                return(
                                    <option value={value.categoryID}
                                            key={index.toString()}
                                            selected={this.state.categoryID === value.categoryID}
                                    >
                                        {value.categoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product name</label>
                        <input  onChange={this.handleChange}
                                placeholder="Product name"
                                type="text"
                                className="form-control"
                                id="productName"
                                value={this.state.productName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product price ({config.currency})</label>
                        <input  onChange={this.handleChange}
                                placeholder="Product price"
                                type="number"
                                className="form-control"
                                id="productPrice"
                                min="0.00"
                                step="0.01"
                                value={this.state.productPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product description</label>
                        <textarea
                            onChange={this.handleChange}
                            placeholder="Product description"
                            rows="16"
                            className="form-control"
                            id="productDescription"
                            value={this.state.productDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product image url</label>
                        <input  onChange={this.handleChange}
                                placeholder="Product image url"
                                type="text"
                                className="form-control"
                                id="productImageUrl"
                                value={this.state.productImageUrl}
                        />
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="visible"
                                   onChange={this.handleChangeRadio}
                                   value="true"
                                   name="isVisible"
                                   required
                                   checked={this.state.isVisible.toString() === "true"}
                            />
                            <label className="form-check-label" htmlFor="visible">Visible</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="invisible"
                                   onChange={this.handleChangeRadio}
                                   value="false"
                                   name="isVisible"
                                   checked={this.state.isVisible.toString() === "false"}
                            />
                            <label className="form-check-label" htmlFor="invisible">Invisible</label>
                        </div>
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="recommended"
                                   onChange={this.handleChangeRadio}
                                   value="true"
                                   name="isRecommended"
                                   required
                                   checked={this.state.isRecommended.toString() === "true"}
                            />
                            <label className="form-check-label" htmlFor="recommended">Recommended</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="notrecommended"
                                   onChange={this.handleChangeRadio}
                                   value="false"
                                   name="isRecommended"
                                   checked={this.state.isRecommended.toString() === "false"}
                            />
                            <label className="form-check-label" htmlFor="notrecommended">Not recommended</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning btn-block">Edit</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
            </div>
        );
    }
}

export default EditProduct;
