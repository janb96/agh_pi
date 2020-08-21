import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import ApiResponse from './../utils/ApiResponse';

class EditTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableName: this.props.tableName,
            tableStatus: this.props.tableStatus,
            apiResponse: "",
            status: "",
            tableID: this.props.tableID,
            avalibleTableStatus: [
                "FREE",
                "BUSY",
                "INACTIVE"
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            tableID: this.state.tableID,
            tableName: this.state.tableName,
            tableStatus: this.state.tableStatus
        };
        axios.put(config.apiUrl + "/tables", putData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    setTimeout(function(){ window.location.reload(); }, 1000);
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

        return (
            <div className="restaurant-manage-form">
                <hr/>
                <h3>Edit table (tableID: {this.props.tableID} tableName: {this.props.tableName})</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Table name</label>
                        <input  onChange={this.handleChange}
                                placeholder="Table name"
                                type="text"
                                className="form-control"
                                id="tableName"
                                value={this.state.tableName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Table status</label>
                        <select  onChange={this.handleChange}
                                 className="form-control"
                                 id="tableStatus"
                        >
                            <option value="">
                                Select table status
                            </option>
                            {this.state.avalibleTableStatus.map((value, index) => {
                                return(
                                    <option selected={this.props.tableStatus === value} value={value} key={index.toString()}>
                                        {value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-warning btn-block">Edit</button>
                    <ApiResponse status={this.state.status} apiResponse={this.state.apiResponse}/>
                </form>
            </div>
        );
    }
}

export default EditTable;
