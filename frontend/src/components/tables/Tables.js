import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';
import Table from './Table';

class Tables extends Component {

    constructor() {
        super();
        this.state = {
            tables: []
        };
    }

    componentDidMount() {

        let apiUrl = config.apiUrl;
        axios.get(apiUrl + this.props.tablesUrl).then(response => {
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
                    {this.state.tables.map((value, index) => {
                        return <Table table={value} key={index.toString()}/>
                    })}
                </div>
            );
        } else {
            return(
                <div className="tables">
                    <div className="alert alert-danger">
                        All tables are busy ;(
                    </div>
                </div>
            );
        }

    }
}

export default Tables;
