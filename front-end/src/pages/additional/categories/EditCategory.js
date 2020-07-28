import React, { Component } from "react";
import { URL } from '../helpers/url';
import axios from 'axios';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import Modal from '../modals/Modal';
import { Form, FormControl, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { Portal } from 'react-portal';
import SaveButton from '../buttons/SaveBtn';
import GoBackButton from '../buttons/GreyBtn';


class EditCategory extends Component {
   _isMounted =  false;

    constructor(props) {
        super(props);
            this.state = {
                name:  '',
                image: '',
                newImage: '',
                choseNewImg: false,
                inHomepage: false,
                loading: true,
                isOpen: false,
                //verify Name
                isName: true, 
                isNameValid: true,
                //verify Image
                isImage: true,
                isImageValid: true,
                 //Auth
                isAuth: false,
            }

    }


  componentDidMount() {
    this._isMounted = true;

    const token = localStorage.getItem('user_token');

    if (token !== null) {
        this.setState({isAuth: true})
    } else {
      this.setState({isAuth: false});
    }

    setTimeout( () => {
    axios.get(URL + '/api/category/' + this.props.match.params.categoryId)
    .then(res => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        image: res.data.image,
        loading: false
      });
    }).catch((error) => console.log(error));
    }, 1200)
  }

  componendDidUpdate(prevState) {
    return this.state.isAuth !== prevState.isAuth;
  }

  componentWillUnmount() {
      this._isMounted = false;
  }


    onChange = (e) => {
    this.setState({ name: e.target.value});
    }

    onFileChange = (e) => {
        this.setState({ 
          image: e.target.files[0],
          newImage: window.URL.createObjectURL(e.target.files[0]),
          choseNewImg: true
        });
    }

    callModal = () => {
      this.setState({isOpen: true});
    }
    
    closeModal = () => {
      this.setState({isOpen: false});
    }

    goBack = () => {
      window.location.hash="/category/" + this.props.match.params.categoryId;
    }

    loginPage = () => {
      window.location.hash="/login";
    }

    confirmFields = () => {
      this.setState({isName: true, isNameValid: true, isImage: true })

        if (this.state.name && this.state.image) {
          this.setState({ isName: true, isImage: true })
          if(this.state.name.length < 3 || this.state.name.length > 50) {
            this.setState({ isNameValid: false })
          } else {
              let data = new FormData();
              data.append("image", this.state.image);
              data.set("name", this.state.name);

              this.callModal();

          }
        } else {
            if(!this.state.name) {
                this.setState({ isName: false })
            } else if(this.state.name.length < 3 || this.state.name.length > 50) {
                this.setState({ isNameValid: false })
            } 
            if(!this.state.image) {
              this.setState({ isImage: false })
            }

        }
    }

    updateCategory = () => {

       let data = new FormData();
       if(typeof(this.state.image) !== 'string') {
         data.append("image", this.state.image);
       } else {
         data.set("image", this.state.image)
       }

        data.set("name", this.state.name);
        data.append('_method', 'PUT');
        axios.post(URL + '/api/category/' + this.props.match.params.categoryId, data)    
        .then(window.location.hash = "/category/" + this.props.match.params.categoryId)
        .catch(error => {
            console.log(error);
        });

    }

  render() {
    let { loading, inHomepage, isName, isNameValid, isImage, choseNewImg } = this.state;

    return (

      (loading) ? (
        <Loading />
      ) : (
        this.state.isAuth ? (
        <>
        <Header inHomepage={inHomepage}/>
        <section className="add-category-section small-container">
          <div className="pg-title title"><h1>Edit Category</h1></div>
          <Form className="large-form" type='post'> 
            <FormGroup as={Row} className="groupOfName">
              <FormLabel>
              Title:
              </FormLabel>
              <FormControl className={"inputName", (isName && isNameValid) ? "" : "warning-input" } type="text" name="name" value={ this.state.name } onChange= { this.onChange } />
              <p className="warningMsg name-warning" style={{ display: (isName) ? "none" : "inline-block" }} >Name is required</p>
              <p className="warningMsg name-characters-warning" style={{ display: (isNameValid) ? "none" : "inline-block" }} >Name must contain at least 3 and no more than 50 characters</p>
            </FormGroup>
            <FormGroup as={Row}>
              <Col sm="12" className="addImg-col">
                    <FormLabel className="titleOfUpload">
                        Update image:
                    </FormLabel> 
              </Col>
              <Col className="image-update-category">
                  <div className="image-wrap-inEditForm">
                      <img style={{ display: choseNewImg ? "none": "block" }} src={this.state.image}/>
                      <img style={{ display: choseNewImg ? "block": "none" }} src={this.state.newImage}/>
                  </div>
              <div className="input-wrap-inEditForm">
                <FormControl className={"inputUpload", (isImage) ? "" : "warning-input" } type="file" accept="image/*" name="image" defaultValue={''} onChange= { this.onFileChange } />
                <p className="warningMsg file-warning" style={{ display: (isImage) ? "none" : "inline-block" }} >Image is required</p>
              </div>
              </Col>
              </FormGroup>
              <FormGroup as={Row} controlId="formHorizontalProduct" className="edit-Btns">
                    <SaveButton confirmEdit={this.confirmFields} title={"save"}/>
                    <GoBackButton name={"cancel"} isAuth={this.state.isAuth} authFunc={this.goBack} confirmFunction={this.goBack} />
              </FormGroup>
            </Form>
          </section>
          <Footer />
          <Portal><Modal isOpen={this.state.isOpen} header={"ITEM UPDATE"} closeModal={this.closeModal} message={"Are you sure you want to update the item"} callFunction={this.updateCategory} ></Modal></Portal>
        </>
        ) : (
          <>
          <Header inHomepage={this.state.inHomepage}/>
              <section className="add-product-section-authorized">
                  <div className="background-div"></div>
              </section>
          <Footer />
          <Portal><Modal header={"Authorization Resctrictions"} message={"Please login or register in order to complete the action."} isOpen={true} closeModal={this.goBack} callFunction={this.loginPage} /></Portal>
          </>
        )
      )
      );
    }
}

export default EditCategory