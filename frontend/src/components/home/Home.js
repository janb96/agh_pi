import React, {Component} from 'react';
import "./Home.css";
import {Link} from "react-router-dom";
import Tables from "./../tables/Tables";

class Home extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="home">
                <div className="jumbotron text-center">
                    <h1 className="display-3">Choose your table</h1>
                </div>
                <div className="container">
                    <Tables tablesUrl="/tables/byTableStatus/FREE"/>
                </div>
            </div>
        );
    }
}

export default Home;
