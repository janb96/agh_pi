import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

import Category from './Category';

class Categories extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            selectedCategoryID: null
        };
        this.selectCategory = this.selectCategory.bind(this);
    }

    componentDidMount() {

        axios.get(config.apiUrl + "/categories/visible").then(
            response => {
                this.setState({
                    categories: response.data.message
                })
            }
        );

    }

    selectCategory(categoryID) {
        this.setState({
            selectedCategoryID: categoryID
        });
        this.props.setCategoryID(categoryID);
    }

    render() {

        if(this.state.categories.length > 0) {
            return(
                <div className="categories-selector">
                    <h3>Choose category</h3>
                    <div className="btn-group-vertical">
                        {this.state.categories.map((value, index) => {
                            return <Category
                                selectCategory={this.selectCategory}
                                category={value}
                                key={index.toString()}
                            />
                        })}
                    </div>
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

export default Categories;
