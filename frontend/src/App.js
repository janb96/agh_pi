import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import MakeOrder from './components/orders/MakeOrder';
import Login from "./components/employees/Login";
import axios from 'axios';
import EmployeePanel from "./components/employees/EmployeePanel";
import AddTable from './components/tables/AddTable';
import AddCategory from "./components/categories/AddCategory";
import AddProduct from "./components/products/AddProduct";
import AddEmployee from "./components/employees/AddEmployee";
import EditTables from "./components/tables/EditTables";
import EditCategories from "./components/categories/EditCategories";
import EditProducts from "./components/products/EditProducts";
import Orders from "./components/orders/Orders";
import PaidOrders from "./components/orders/PaidOrders";

axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");

class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/makeOrder/:tableID' component={MakeOrder}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/employeePanel' component={EmployeePanel}/>
                    <Route path='/table/add' component={AddTable}/>
                    <Route path='/table/edit' component={EditTables}/>
                    <Route path='/category/add' component={AddCategory}/>
                    <Route path='/category/edit' component={EditCategories}/>
                    <Route path='/product/add' component={AddProduct}/>
                    <Route path='/product/edit' component={EditProducts}/>
                    <Route path='/employee/add' component={AddEmployee}/>
                    <Route path='/orders/active' component={Orders}/>
                    <Route path='/orders/paid' component={PaidOrders}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;
