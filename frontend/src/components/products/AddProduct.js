import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';

class AddProduct extends Component {

    constructor() {
        super();
        this.state = {
            productName: "",
            productPrice: 0,
            categoryID: "",
            productDescription: "",
            productImageUrl: "",
            isVisible: "",
            isRecommended: "",
            categories: [],
            apiResponse: "",
            status: "",
            isLogin: "",
            userData: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmployeeToken = this.checkEmployeeToken.bind(this);
    }

    componentDidMount() {
        this.checkEmployeeToken();

        axios.get(config.apiUrl + "/categories").then(
            response => {
                this.setState({
                    categories: response.data.message
                });

            });

    }

    async checkEmployeeToken() {
        let response = await axios.get(config.apiUrl + "/employees/checkEmployeeToken");
        this.setState({
            isLogin: response.data.status,
            userData: response.data.message
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            categoryID: this.state.categoryID,
            productDescription: this.state.productDescription,
            productImageUrl: this.state.productImageUrl,
            isVisible: this.state.isVisible,
            isRecommended: this.state.isRecommended,
        };
        axios.post(config.apiUrl + "/products", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
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

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }

        if(!this.state.userData){
            return (<></>);
        }

        console.log(this.state);

        return (
            <div className="restaurant-manage-form">
                <h1>Add product</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Choose product category</label>
                        <select  onChange={this.handleChange} className="form-control" id="categoryID">
                            <option value="" selected>
                                Choose product category
                            </option>
                            {this.state.categories.map((value, index) => {
                                return(
                                    <option value={value.categoryID} key={index.toString()}>
                                        {value.categoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product name</label>
                        <input  onChange={this.handleChange} placeholder="Product name" type="text" className="form-control" id="productName"/>
                    </div>
                    <div className="form-group">
                        <label>Product price ({config.currency})</label>
                        <input  onChange={this.handleChange} placeholder="Product price" type="number" className="form-control" id="productPrice" min="0.00" step="0.01"/>
                    </div>
                    <div className="form-group">
                        <label>Product description</label>
                        <textarea
                            onChange={this.handleChange}
                            placeholder="Product description"
                            rows="16"
                            className="form-control"
                            id="productDescription"
                        />
                    </div>
                    <div className="form-group">
                        <label>Product image url</label>
                        <input  onChange={this.handleChange} placeholder="Product image url" type="text" className="form-control" id="productImageUrl"/>
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="visible" onChange={this.handleChangeRadio} value="true"
                                   name="isVisible" required/>
                            <label className="form-check-label" htmlFor="visible">Visible</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="invisible" onChange={this.handleChangeRadio} value="false" name="isVisible"/>
                            <label className="form-check-label" htmlFor="invisible">Invisible</label>
                        </div>
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="recommended" onChange={this.handleChangeRadio} value="true"
                                   name="isRecommended" required/>
                            <label className="form-check-label" htmlFor="recommended">Recommended</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="notrecommended" onChange={this.handleChangeRadio} value="false" name="isRecommended"/>
                            <label className="form-check-label" htmlFor="notrecommended">Not recommended</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">Add</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
            </div>
        );
    }
}

export default AddProduct;
