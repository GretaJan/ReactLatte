import React, { Component } from "react";
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw, renderHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Categories from '../categories/CategoriesList';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import DeleteBtn from '../buttons/GreyBtn';
import EditProductBtn from '../buttons/GreenEmptyBtn';
import Modal from '../modals/Modal';
import { Portal } from 'react-portal';
import { URL } from '../helpers/url';

class ProductDetails extends Component {

  state = {
    id: '',
    category_id: '',
    title: '',
    image: '',
    original_price: '',
    lower_price: '',
    // description: '',
    description: EditorState.createEmpty(),
    hideToolbar: true,
    categories: [],
    hover: false,
    loading: true,
    deleted: false,
    inHomepage: false,
    isOpen: false,
    isAuth: false,
    isOpenAuth: false,
    viewMore: false,
  }

  componentDidMount() {
    const token = localStorage.getItem('user_token');

    if(token !== null) {
      this.setState({isAuth: true});
    } else {
      this.setState({isAuth: false});
    }

      let linkOne = URL + '/api/product/'+ this.props.match.params.productId + '/' + this.props.match.params.category_Id;
      let linkTwo = URL + '/api/categories';

    const requestOne = axios.get(linkOne);
    const requestTwo = axios.get(linkTwo);

    setTimeout(() => {
      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        this.setState({ 
              id: responseOne.data.id,
              category_id: responseOne.data.category_id,
              title: responseOne.data.title,
              original_price: responseOne.data.original_price,
              lower_price: responseOne.data.lower_price,
              description: EditorState.createWithContent(convertFromRaw(JSON.parse(responseOne.data.description))),
              image: responseOne.data.image})
              this.setState({categories: responseTwo.data}); 
        this.setState({loading: false});
      })).catch(errors => console.log("Error: ", errors.response), this.setState({loading: false})); 
    }, 1600);
    
  }

  confirmDelete = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
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

  delProduct = () => {

    setTimeout(() => {
      axios.delete(URL + `/api/product/${this.props.match.params.productId}/${this.props.match.params.category_Id}`)
      .then(() => window.location.hash = "/")
        .catch(err => alert("delete errot: ", err))
    }, 1200)
  }

  render() {
    var matchingCategory = [];
    var priceHeaders = ['Original Price', 'New Price'];
    var priceBody = [this.state.original_price, this.state.lower_price];

    this.state.categories.map(item => {
      if (item.id == this.state.category_id) {
        matchingCategory.push(item);
      } 
    })

    const priceArray = priceHeaders.map((headerItem, headerIndex) => {
      return  <> 
         { priceBody.map((bodyItem, bodyIndex) => {
           if (headerIndex == bodyIndex) {
             return <table className="price-table-inDetails"><th >{headerItem}: </th> <td  key={bodyIndex}>{bodyItem}&euro;</td></table>
         }
        }) }
        </>
    });

    const showDescription = () => {
      const descriptionText = this.state.description;
      if(descriptionText < 400) {
        return (
          <Editor editorState={this.state.description} readOnly={true} 
                     toolbarOnFocus={!this.state.hideToolbar}
                     toolbarHidden={false}
                     wrapperClassName="demo-wrapper"
                     editorClassName="demo-editor"
                     toolbarClassName="toolbar-class" 
          /> 
        )
      } 
      else {
        return (
          <> 
          <div className={this.state.viewMore ? "descriptionDivVisible" : "descriptionDivHidden"}>
            <Editor style={{display: 'flex' }} editorState={ this.state.description }
                      readOnly={true} 
                      toolbarOnFocus={!this.state.hideToolbar}
                      toolbarHidden={true}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      toolbarClassName="toolbar-class" 
            /> 
          </div>
           <div className="greyBtn centerButton" onMouseEnter={() => this.setState({hover: true})} 
                onMouseLeave={() => this.setState({hover: false})} 
                onClick={() => this.setState({viewMore: !this.state.viewMore}) } >
              <h5 className={(this.state.hover) ? "onHoverWhite" : ""} > { this.state.viewMore ? "Hide" : "View more"}</h5>
           </div>
          </>
        )
      }
    }

    return (
      <>
      {this.state.loading ? (
        <Loading />
      ) : (
        <section>
          <Header inHomepage={this.state.inHomepage}/>
            <div className="small-container">
                <div className="product-details-section">
                  <div className="details-sideInfo-flex">
                    <div className="product-details-img-itemOne">
                      <img className="single-product-img" src= {this.state.image} />
                    </div>
                    <div className="price-inDetails-wrap-itemTwo">
                      <div className="flex-item-title pg-title title">
                        <h1>{ this.state.title}</h1>
                        </div>
                        <div className="flex-item-two-otherDetails">
                        {priceArray}
                        <div className="btns-inProduct-wrap"> 
                          <div className="edit-product-productDetails">
                              <EditProductBtn isAuth={this.state.isAuth} authFunc={this.openModalAuth} link={`/edit-product/${this.state.id}/${this.state.category_id}`} classNameOne={"editProduct-link"} title={"Edit"} />
                          </div>
                          <div className="delete-product-productDetails">
                            <DeleteBtn isAuth={this.state.isAuth} authFunc={this.openModalAuth} confirmFunction={this.confirmDelete} name={"Delete"}/>
                          </div>
                        </div>
                        <div className="categoryIndicator"><p>Category: </p><Categories categories={matchingCategory}/></div>
                        </div>
                      </div>
                  </div>
                  <div className="product-description-wrap">
                    <h4>Description</h4>
                    {showDescription()}
                  </div>
              </div>
            </div>
           <Footer />
      </section>
      )}
    <Portal><Modal message={"Are you sure you want to delete item "} title={"\"" + this.state.title + "\" ?"} isOpen={this.state.isOpen} closeModal={this.closeModal} callFunction={this.delProduct} header={"Confirm Delete"} /></Portal>
    <Portal><Modal header={"authorization restrictions"} message={"Please login or register in order to complete the action."} isOpen={this.state.isOpenAuth} closeModal={this.closeModalAuth} callFunction={this.loginPg} /></Portal>
      </>
    );
  }
}

export default ProductDetails;