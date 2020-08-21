import React, {Component} from 'react';

class ApiResponse extends Component {

    constructor() {
        super();
        this.getAlertStyle = this.getAlertStyle.bind(this);
    }

    getAlertStyle() {
        if(this.props.status === true) {
            return "alert alert-success";
        }
        if(this.props.status === false) {
            return "alert alert-danger";
        }

        return "";
    }

    render() {
        return (
            <div className="api-response">
                <div className={this.getAlertStyle()}>
                    {this.props.apiResponse}
                </div>
            </div>
        );
    }
}

export default ApiResponse;
