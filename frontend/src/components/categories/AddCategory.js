import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';
import Navbar from "../utils/Navbar";

class AddCategory extends Component {

    constructor() {
        super();
        this.state = {
            categoryName: "",
            categoryDescription: "",
            categoryImageUrl: "",
            isVisible: "",
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
            categoryName: this.state.categoryName,
            categoryDescription: this.state.categoryDescription,
            categoryImageUrl: this.state.categoryImageUrl,
            isVisible: this.state.isVisible
        };
        axios.post(config.apiUrl + "/categories", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        apiResponse: "Category created",
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
        this.setState({
            isVisible: event.target.value
        });
    }

    render() {

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }

        if(!this.state.userData){
            return (<></>);
        }
        
        return (
            <div className="restaurant-manage-form">
                <Navbar/>
                <div className="container">
                <h1>Add category</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Category name</label>
                        <input  onChange={this.handleChange} placeholder="Category name" type="text" className="form-control" id="categoryName"/>
                    </div>
                    <div className="form-group">
                        <label>Category description</label>
                        <textarea
                            onChange={this.handleChange}
                            placeholder="Category description"
                            rows="16"
                            className="form-control"
                            id="categoryDescription"
                        />
                    </div>
                    <div className="form-group">
                        <label>Category image url</label>
                        <input  onChange={this.handleChange} placeholder="Category image url" type="text" className="form-control" id="categoryImageUrl"/>
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
                    <button type="submit" className="btn btn-secondary btn-block">Add</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
                </div>
            </div>
        );
    }
}

export default AddCategory;
