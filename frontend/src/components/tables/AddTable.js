import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';
import Navbar from "../utils/Navbar";

class AddTable extends Component {

    constructor() {
        super();
        this.state = {
            tableName: "",
            tableStatus: "",
            apiResponse: "",
            status: "",
            isLogin: "",
            userData: null,
            avalibleTableStatus: [
                "FREE",
                "BUSY",
                "INACTIVE"
            ]
        };
        this.handleChange = this.handleChange.bind(this);
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
            tableName: this.state.tableName,
            tableStatus: this.state.tableStatus
        };
        axios.post(config.apiUrl + "/tables", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        apiResponse: response.data.message,
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
                    <h1>Add table</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Table name</label>
                            <input  onChange={this.handleChange} placeholder="Table name" type="text" className="form-control" id="tableName"/>
                        </div>
                        <div className="form-group">
                            <label>Table status</label>
                            <select  onChange={this.handleChange} className="form-control" id="tableStatus">
                                <option value="">
                                    Select table status
                                </option>
                                {this.state.avalibleTableStatus.map((value, index) => {
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

export default AddTable;
