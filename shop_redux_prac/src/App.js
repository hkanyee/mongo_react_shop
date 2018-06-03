import React, {Component} from 'react';
import Home from './components/home';
import Shopcart from './components/shop_cart';
import Login from './components/login_page'
import EmptyCart from './components/empty_cart'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (<Router>
      <div>
        <Route exact="exact" path="/" component={Home}/>
        <Route exact="exact" path="/shop_cart" component={EmptyCart}/>
        <Route path="/shop_cart/:key" component={Shopcart}/>
        <Route path="/user" component={Login}/>
      </div>
    </Router>);
  }
}

export default App;
