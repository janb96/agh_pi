import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import EditTable from "./EditTable";
import Navbar from "../utils/Navbar";

class EditTables extends Component {

    constructor() {
        super();
        this.state = {
            tables: []
        };
    }

    componentDidMount() {

        let apiUrl = config.apiUrl;
        axios.get(apiUrl + "/tables").then(response => {
            if(response.data.status) {
                let tables = response.data.message;
                this.setState({
                    tables: tables
                });
            }
        });

    }

    render() {

        if(this.state.tables.length >= 1) {
            return(
                <div className="tables">
                    <Navbar/>
                    <div className="container">
                    {this.state.tables.map((value, index) => {
                        return <EditTable tableID={value.tableID}
                                          tableName={value.tableName}
                                          tableStatus={value.tableStatus}
                                          key={index.toString()}
                        />
                    })}
                    </div>
                </div>
            );
        } else {
            return(
                <div className="tables">
                    <Navbar/>
                    <div className="container">
                        <div className="alert alert-danger">
                            No tables found
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default EditTables;
