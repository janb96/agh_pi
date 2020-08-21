import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ManageRestaurantButtons from './ManageRestaurantButtons';
import ManageOrdersButtons from "./ManageOrdersButtons";

class EmployeePanel extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: "",
            userData: null
        };
        this.checkEmployeeToken = this.checkEmployeeToken.bind(this);
        this.signOut = this.signOut.bind(this);
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

    signOut() {
        window.localStorage.removeItem("token");
        window.location.href = "/login";
    }

    render() {

        console.log(this.state.userData);

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }

        if(!this.state.userData){
            return (<></>);
        }

        return (
            <div className="employee-panel">
                <div className="jumbotron text-center">
                    <h1 className="display-3">Employee panel</h1>
                    <button type="button" className="btn btn-danger" onClick={this.signOut}>
                        Sign out <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Employee Data</h3>
                            <p>
                                <strong>Employee name:</strong> {this.state.userData.employeeName}
                            </p>
                            <p>
                                <strong>Permission type:</strong> {this.state.userData.permissionType}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h3>Manage restaurant</h3>
                            <ManageRestaurantButtons userData={this.state.userData}/>
                        </div>
                        <div className="col-md-4">
                            <h3>Manage orders</h3>
                            <ManageOrdersButtons userData={this.state.userData}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeePanel;
