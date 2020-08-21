import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import EditCategory from "./EditCategory";

class EditCategories extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            isLogin: "",
            userData: null
        };
        this.checkEmployeeToken = this.checkEmployeeToken.bind(this);
    }

    async checkEmployeeToken() {
        let response = await axios.get(config.apiUrl + "/employees/checkEmployeeToken");
        this.setState({
            isLogin: response.data.status,
            userData: response.data.message
        });
    }

    componentDidMount() {

        this.checkEmployeeToken();

        axios.get(config.apiUrl + "/categories").then(
            response => {
                this.setState({
                    categories: response.data.message
                })
            }
        );

    }

    render() {

        if(this.state.isLogin.toString() === "false") {
            window.location.href = "/login";
        }

        if(!this.state.userData){
            return (<></>);
        }

        if(this.state.categories.length > 0) {
            return(
                <div className="edit-categories">
                    {this.state.categories.map((value, index) => {
                        return <EditCategory
                            categoryID={value.categoryID}
                            categoryName={value.categoryName}
                            categoryDescription={value.categoryDescription}
                            categoryImageUrl={value.categoryImageUrl}
                            isVisible={value.isVisible}
                            key={index.toString()}
                        />
                    })}
                </div>
            );
        } else {
            return(
                <div className="categories-selector">
                    <div className="alert alert-danger">No categories found</div>
                </div>
            );
        }

    }

}

export default EditCategories;
