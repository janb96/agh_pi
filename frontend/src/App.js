import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import MakeOrder from './components/orders/MakeOrder';
import './App.css';
import axios from 'axios';

axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");

class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/makeOrder/:tableID' component={MakeOrder}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;
