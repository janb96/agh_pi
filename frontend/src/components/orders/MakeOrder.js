import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

class MakeOrder extends Component {

    constructor() {
        super();
        this.state = {
            tableID: null
        };
    }

    componentDidMount() {

        let { tableID } = this.props.match.params;

        this.setState({
            tableID: tableID
        });

        const putData = {
            tableID: parseInt(tableID)
        };

        axios.put(config.apiUrl + "/tables/useTable", putData).then(
            response => {
                console.log(response.data);
            }
        );

    }

    render() {

        return(
            <div className="make-order">

            </div>
        );

    }

}

export default MakeOrder;
