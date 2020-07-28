import React, { Component } from 'react';
import {
  HashRouter as Router, 
  Route, 
  Switch, 
  Redirect
} from 'react-router-dom';

//Pages
import MainPage from './pages/Index';
import PageNotFound from './pages/additional/modals/404';
import AddCategory from './pages/additional/categories/AddCategory';
import AddProduct from './pages/additional/products/AddProduct';
import EditCategory from './pages/additional/categories/EditCategory';
import EditProduct from './pages/additional/products/EditProduct';
import CategoryDetails from './pages/additional/categories/CategoryDetails';
import ProductDetails from './pages/additional/products/ProductDetails';
import Registration from './pages/additional/authorization/Registration';
import Login from './pages/additional/authorization/Login';
import Profile from './pages/additional/authorization/Profile';

class App extends Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/addCategory" component={AddCategory}/>
          <Route path="/addProduct" component={AddProduct}/>
          <Route exact path="/category/:categoryId" component={CategoryDetails} />
          <Route exact path="/edit-category/:categoryId" component={EditCategory} />
          <Route exact path="/product/:productId/:category_Id" component={ProductDetails} />
          <Route exact path="/edit-product/:productId/:category_Id" component={EditProduct} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route to="/404" component={PageNotFound}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    )
  }
}

export default App;
