import React, { Component } from "react";
import axios from 'axios';
import Products from '../products/Products';
import Categories from './CategoriesList';
import Header from '../layout/Header';
import EditCategoryBtn from '../buttons/GreenEmptyBtn';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import DeleteBtn from '../buttons/GreyBtn';
import Modal from '../modals/Modal';
import { Portal } from 'react-portal';
import CategoriesDropdown from '../dropDowns/CategoriesDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import { URL } from '../helpers/url';


class CategoryDetails extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name:  '',
      image: '',
      products: [],
      categories: [],
      loading: true,
      inCategory: true,
      inHomepage: false,
      isOpen: false,
      inMobile: false,
      showMobileList: false,
      indexMobileShow: false,
      isAuth: false,
      isOpenAuth: false,
      noProducts: false,
      currentPage: 1,
      lastPage:'',
    }
  }

  componentWillMount() {
    this._isMounted = true;
    const token = localStorage.getItem('user_token');

    if(token !== null) {
      this.setState({isAuth: true});
    } else {
      this.setState({isAuth: false});
    }

      let linkOne = URL + '/api/category/'+ this.props.match.params.categoryId;
      let linkTwo = URL + `/api/products/${this.props.match.params.categoryId}?page=${this.state.currentPage}`;
      let linkThree = URL + '/api/categories';
 
    const requestOne = axios.get(linkOne);
    const requestTwo = axios.get(linkTwo);
    const requestThree = axios.get(linkThree);
    setTimeout(() => {
      axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        this.setState({id: responseOne.data.id, name: responseOne.data.name, image: responseOne.data.image });
        if(!responseTwo.data.data.length) {
          this.setState({noProducts: true});
        } else {
          this.setState({products: responseTwo.data.data});
          this.setState({lastPage: responseTwo.data.meta.last_page})
        }
        this.setState({categories: responseThree.data});
        this.setState({loading: false});
      })).catch(errors => console.log(errors)); 
    }, 1200);

    this.updateOnResize();
    window.addEventListener("resize", this.updateOnResize);
  }
  prevPage = () => {
    let link = URL + `/api/products/${this.props.match.params.categoryId}?page=${this.state.currentPage - 1}`;
    axios.get(link)
      .then(data => this.setState({products: data.data.data, currentPage: data.data.meta.current_page, lastPage: data.data.meta.last_page }))
        .catch(err => console.log(err));
  }
  nextPage = () => {
    let link = URL + `/api/products/${this.props.match.params.categoryId}?page=${this.state.currentPage + 1}`;
    axios.get(link)
      .then(data => 
        this.setState({products: data.data.data, currentPage: data.data.meta.current_page, lastPage: data.data.meta.last_page }))
        .catch(err => console.log(err));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateOnResize);
    this._isMounted = false;
  }

  openModalAuth = () => {
    this.setState({isOpenAuth: true});
  }

  closeModalAuth = () => {
    this.setState({isOpenAuth: false});
  }

  loginPg = () => {
    window.location.hash="/login";
  }
  
  closeModal = () => {
    this.setState({isOpen: false});
  }

  newCategory = () => {
    this.setState({id: '', name: '', image: ''});
  }

  confirmDelete = () => {
    this.setState({isOpen: true});
  }

  updateOnResize = () => {
    this.setState({ inMobile: window.innerWidth <= 920 });
  }

  delCategory = () => {
      axios.delete(URL + `/api/category/${this.props.match.params.categoryId}`)
      .then(() => window.location.hash = "/").catch(err => console.log(err));
  }

  render() {
    return (
      <>
       {this.state.loading ? (
        <Loading />
      ) : (
            <section className="categoryDetailSection">
              <Header inHomepage={this.state.inHomepage}/>
              <div className="medium-container">
                <div className="category-details-flex" >
                  <div className="left-flex-withCategory-list" >
                    <div className="categoriesList-delCategory-wrap">
                          {(!this.state.inMobile) ? (
                            <div className="categoryList-inCategories">
                            <div className="category-list-indicator">
                              <h3>Categories</h3></div>
                                <ul>
                                <Categories categories={this.state.categories}/>
                                </ul>
                              </div>
                            ) : (
                                <div className="categoryList-inCategories">
                                  <Button variant="success" className="category-list-indicator category-list-indicator-mobile-first" onClick={() => this.setState({showMobileList: !this.state.showMobileList, indexMobileShow: !this.state.indexMobileShow})}>
                                    <h3>Categories <FontAwesomeIcon icon={(!this.state.showMobileList) ? faAngleDown : faAngleUp} /></h3>
                                  </Button>
                                <ul className="categories-list-mobile" style={{display : !this.state.showMobileList ? "none" : "block"}} >
                                { this.state.categories.map((item) => (
                                  <CategoriesDropdown category={item} />
                                  )) 
                                  } 
                                </ul>
                              </div>
                            ) 
                          }
                          <div className="btns-inCategoryEdit">
                            <div style={{ zIndex: this.state.indexMobileShow ? "-1" : "0" }}>
                              <EditCategoryBtn isAuth={this.state.isAuth} authFunc={this.openModalAuth} link={`/edit-category/${this.props.match.params.categoryId}`} classNameOne={"editCategory-link"} title={"Edit"} />
                            </div>
                            <div style={{ zIndex: this.state.indexMobileShow ? "-1" : "0" }}>
                              <DeleteBtn isAuth={this.state.isAuth} authFunc={this.openModalAuth} confirmFunction={this.confirmDelete} name={"Delete"} />
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="category-details-reparate-container" style={{ zIndex: this.state.indexMobileShow ? "-1" : "0" }}>
                      <div className="categoryName-inCategories categoryName pg-title title"><h1>{this.state.name}</h1></div>
                      <div className="product-list-inCategories">
                        {this.state.noProducts ? (
                          <p>Store has not products assigned to this category...</p>
                        ) : (
                          <>
                            <Products products={this.state.products} inCategory={this.state.inCategory}/>
                            <div className="pagination-wrap">
                              <span className={this.state.currentPage === 1 ? "pagination-click-inactive" : "pagination-click-active"} onClick={this.state.currentPage === 1 ? null : this.prevPage} ><FontAwesomeIcon icon={faChevronLeft} /></span>
                              <span className="pagination-no">{this.state.currentPage}</span>
                              <span className={this.state.currentPage === this.state.lastPage ? "pagination-click-inactive" : "pagination-click-active"} onClick={this.state.currentPage === this.state.lastPage ? null : this.nextPage} ><FontAwesomeIcon icon={faChevronRight} /></span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
              </div>
              <Footer />
            </section> 
        )
      } 
      <Portal><Modal header={"Confirm Delete"}  closeModal={this.closeModal}  message={"Are you sure you want to delete item"} title={"\"" + this.state.name + "\" ?"} isOpen={this.state.isOpen} closeModal={this.closeModal} callFunction={this.delCategory}/></Portal>
      <Portal><Modal header={"authorization restrictions"} message={"Please login or register in order to complete the action."} isOpen={this.state.isOpenAuth} closeModal={this.closeModalAuth} callFunction={this.loginPg} /></Portal>
      </>
    );
  }
}

export default CategoryDetails


