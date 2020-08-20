import React, {Component} from 'react';

class Category extends Component {

    constructor() {
        super();
        this.state = {
        };
        this.chooseCategory = this.chooseCategory.bind(this);
    }

    chooseCategory() {
        this.props.selectCategory(this.props.category.categoryID)
    }

    render() {

        return(
            <button className="btn btn-secondary" onClick={this.chooseCategory}>
                {this.props.category.categoryName}
            </button>
        );

    }

}

export default Category;
