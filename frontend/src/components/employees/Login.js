import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            apiResponse: "",
            status: "",
            isLogin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmployeeToken = this.checkEmployeeToken.bind(this);
    }

    async componentWillMount() {
        this.setState({
            isLogin: await this.checkEmployeeToken()
        });
    }

    async checkEmployeeToken() {
        let response = await axios.get(config.apiUrl + "/employees/checkEmployeeToken");
        console.log(response.data);
        return response.data.status;
    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(config.apiUrl + "/employees/authenticate", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    window.localStorage.setItem("token", response.data.message.token);
                    axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");
                    window.location.href = "/employeePanel";
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

        console.log(this.state.isLogin);

        if(this.state.isLogin) {
            window.location.href = "/employeePanel";
        }

        return (
            <div className="sign-in-form">
                <h1>Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input  onChange={this.handleChange} placeholder="Email address" type="email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input  onChange={this.handleChange} placeholder="Password" type="password" className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">Sign in</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
            </div>
        );
    }
}

export default Login;
