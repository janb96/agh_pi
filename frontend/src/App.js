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
                    <Route path='/category/add' component={AddCategory}/>
                    <Route path='/product/add' component={AddProduct}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;
