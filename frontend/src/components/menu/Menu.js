import React, {Component} from 'react';
import Categories from "./../categories/Categories";
import Products from "./../products/Products";

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            categoryID: null,
            orderDetails: []
        };
        this.orderDetailsHandler = this.orderDetailsHandler.bind(this);
        this.setCategoryID = this.setCategoryID.bind(this);
    }

    orderDetailsHandler(orderDetails) {
        this.setState({
            orderDetails: orderDetails
        });
        this.props.setOrderDetails(orderDetails);
    }

    setCategoryID(categoryID) {
        this.setState({
            categoryID: categoryID
        });
    }

    componentDidMount() {

    }

    render() {

        return(
            <div className="restaurant-menu">
                <div className="row">
                    <div className="col-md-4">
                        <Categories setCategoryID={this.setCategoryID}/>
                    </div>
                    <div className="col-md-8">
                        <Products
                            categoryID={this.state.categoryID}
                            orderDetailsHandler={this.orderDetailsHandler}
                            isOrdered={this.props.isOrdered}
                        />

                    </div>
                </div>
            </div>
        );

    }

}

export default Menu;
