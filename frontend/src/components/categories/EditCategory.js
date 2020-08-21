import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';

class EditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryID: this.props.categoryID,
            categoryName: this.props.categoryName,
            categoryDescription: this.props.categoryDescription,
            categoryImageUrl: this.props.categoryImageUrl,
            isVisible: this.props.isVisible,
            apiResponse: "",
            status: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            categoryID: this.state.categoryID,
            categoryName: this.state.categoryName,
            categoryDescription: this.state.categoryDescription,
            categoryImageUrl: this.state.categoryImageUrl,
            isVisible: this.state.isVisible
        };
        axios.put(config.apiUrl + "/categories", putData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    setTimeout(function(){ window.location.reload(); }, 1000);
                    this.setState({
                        apiResponse: "Category changed",
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

        console.log("isVisible = " + this.state.isVisible);
        console.log(this.state.isVisible.toString() === "true");
        console.log(this.state.isVisible.toString() === "false");
        console.log("-----");

        return (
            <div className="restaurant-manage-form">
                <hr/>
                <h3>Edit category (categoryID: {this.props.categoryID} categoryName: {this.props.categoryName})</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Category name</label>
                        <input  onChange={this.handleChange}
                                placeholder="Category name"
                                type="text"
                                className="form-control"
                                id="categoryName"
                                value={this.state.categoryName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category description</label>
                        <textarea
                            onChange={this.handleChange}
                            placeholder="Category description"
                            rows="16"
                            className="form-control"
                            id="categoryDescription"
                            value={this.state.categoryDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category image url</label>
                        <input  onChange={this.handleChange}
                                placeholder="Category image url"
                                type="text"
                                className="form-control"
                                id="categoryImageUrl"
                                value={this.state.categoryImageUrl}
                        />
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio" id="visible"
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
                    <button type="submit" className="btn btn-warning btn-block">Edit</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
            </div>
        );
    }
}

export default EditCategory;
