import React, { Component } from 'react';
import '../App.scss';
import axios from 'axios';
import { URL } from './additional/helpers/url';
//pages
import Categories from './additional/categories/CategoriesIndex';
import Products from './additional/products/Products';
import AddItemBtn from './additional/buttons/AddItemBtn';
import Loading from './additional/modals/Loading';
import Header from './additional/layout/Header';
import Footer from './additional/layout/Footer';
import Modal from './additional/modals/Modal';
import { Portal } from 'react-portal';

class Index extends Component {
  _isMounted = false;

  state = {
    categories: [],
    noCategories: true,
    products: [],
    noProducts: false,
    loading: true,
    delete: false,
    inCategory: false,
    inHomepage: true,
    hoverButton: false,
    isAuth: false,
    isOpen: false,
    token: localStorage.getItem('user_token')
  }
 
    componentDidMount(){
      this._isMounted = true;

      if(this.state.token !== null) {
            this.setState({isAuth: true});
          } else {
            this.setState({isAuth: false});
          }

          let linkOne = URL + '/api/categories';
          let linkTwo = URL + '/api/products';

          const requestOne = axios.get(linkOne);
          const requestTwo = axios.get(linkTwo);

          setTimeout(() => {
          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            if (!responseOne.data.length) {
              this.setState({noCategories: true})
            } else {
              this.setState({categories: responseOne.data, noCategories: false});
            }
            if(!responseTwo.data.length) {
              this.setState({noProducts: true})
            } else {
              this.setState({products: responseTwo.data, noProducts: false});
            }

            this.setState({loading: false});
          })).catch(err => console.log("Category err: ", err.response), this.setState({isLoading: false}))
        }, 1200)
    }

    componentDidUpdate(prevProps) {
      if (this.props.isAuth !== prevProps.isAuth) {
        this.fetchData(this.props.isAuth);
      }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setHover = () => {
      this.setState({hoverButton: true})
    }

    removeHover = () => {
      this.setState({hoverButton: false})
    }

    openModal = () => {
      this.setState({isOpen: true});
    }

    closeModal = () => {
      this.setState({isOpen: false});
    }

    loginPg = () => {
      window.location.hash="/login";
    }

  render() {
    var productItem = this.state.products;
    var recentProducts = [];
    productItem.slice(0, 4).map((product) => {
       recentProducts.push(product);
    });

    return (
        <>
          {(this.state.loading) ? (
            <Loading />
          ) : (
            <>
              <Header inHomepage={this.state.inHomepage}/>
                <section className="indexSection">
                    <h1>{this.recent}</h1>
                    <div className="small-container">
                        <Products products={recentProducts} inCategory={this.state.inCategory } noProducts={this.state.noProducts} /> 
                    </div>
                    <div className="btn-section">
                      <AddItemBtn isAuth={this.state.isAuth}  authFunc={this.openModal} title={"Add Product"} link={"/addProduct"} classNameOne={"add-link"} />
                    </div>
                     <Categories isAuth={this.state.isAuth}  hover={this.state.hoverButton} authFunc={this.openModal} setHover={this.setHover} removeHover={this.removeHover} noCategories ={this.state.noCategories} categories={this.state.categories}/> 
                    <div className="btn-section">
                        <AddItemBtn isAuth={this.state.isAuth}  authFunc={this.openModal} title={"Add Category"} link={"/addCategory"} classNameOne={"add-link"} />
                    </div>
                </section>  
              <Footer />
              <Portal>
                <Modal isOpen={this.state.isOpen} header={"authorization restrictions"} message={"Please login or register in order to complete the action."} callFunction={this.loginPg} closeModal={this.closeModal} />
              </Portal> 
            </>       
          )}
        </>
    )
  }
} 

export default Index