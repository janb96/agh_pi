import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';
import Navbar from "../utils/Navbar";

class AddEmployee extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            isActive: "",
            permissionType: "",
            apiResponse: "",
            status: "",
            isLogin: "",
            userData: null,
            avaliblePermissionTypes: [
                1,
                2,
                3
            ]
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
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            isActive: this.state.isActive,
            permissionType: this.state.permissionType
        };
        axios.post(config.apiUrl + "/employees", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        apiResponse: "Employee created",
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
            isActive: event.target.value
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
                <h1>Add employee</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>User name</label>
                        <input  onChange={this.handleChange} placeholder="User name" type="text" className="form-control" id="name"/>
                    </div>
                    <div className="form-group">
                        <label>User surname</label>
                        <input  onChange={this.handleChange} placeholder="User surname" type="text" className="form-control" id="surname"/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input  onChange={this.handleChange} placeholder="Email address" type="email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input  onChange={this.handleChange} placeholder="Password" type="password" className="form-control" id="password"/>
                    </div>
                    <div className="radio-input">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="active" onChange={this.handleChangeRadio} value="true"
                                   name="isActive" required/>
                            <label className="form-check-label" htmlFor="active">Active</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="inactive" onChange={this.handleChangeRadio} value="false" name="isActive"/>
                            <label className="form-check-label" htmlFor="inactive">Inactive</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Select permission type</label>
                        <select  onChange={this.handleChange} className="form-control" id="permissionType">
                            <option value="">
                                Select permission type
                            </option>
                            {this.state.avaliblePermissionTypes.map((value, index) => {
                                return(
                                    <option value={value} key={index.toString()}>
                                        {value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">Add</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
                </div>
            </div>
        );
    }
}

export default AddEmployee;
