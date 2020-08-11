import React, {Component} from 'react';
import {config} from './../../config';
import {Link} from "react-router-dom";

class Tables extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        let alert_style;

        if(this.props.table.tableStatus === "FREE") {
            alert_style = "alert alert-success";
        } else {
            alert_style = "alert alert-danger";
        }

        return(
            <div className="restaurant-table">
                <Link to={config.makeOrderUrl + "/" + this.props.table.tableID}>
                    <div className={alert_style}>
                        <h3>{this.props.table.tableName}</h3>
                    </div>
                </Link>
            </div>
        );

    }
}

export default Tables;
