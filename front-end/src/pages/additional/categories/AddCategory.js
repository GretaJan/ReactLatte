import React, { Component } from 'react';
import { URL } from '../helpers/url';
import { Form, FormGroup, FormControl, FormLabel, Row, Col  } from "react-bootstrap";
import axios from 'axios';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import { Portal } from 'react-portal';
import Modal from '../modals/Modal';
import SaveButton from '../buttons/SaveBtn';
import GoBackButton from '../buttons/GreyBtn';

class AddCategory extends Component {
    _isMounted =  false;

    state = {
        name: '',
        image: '',
        showImage: '',
        isLoading: true,
        inHomepage: false,
        isOpen: false,
        addImg: false,
        //verify Name
        isName: true, 
        isNameValid: true,
        //verify Image
        isImage: true,
        isImageValid: true,
         //Auth
         isAuth: false,
         token: localStorage.getItem('user_token'),
    }

    componentDidMount() {
        this._isMounted = true;
      
            if (this.state.token !== null) {
            this.setState({isAuth: true})
        } else {
            this.setState({isAuth: false});
        }

        setTimeout(() => {
            this.setState({isLoading: false});
        }, 600);
    
    }

    componendDidUpdate(prevState) {
        return this.state.isAuth !== prevState.isAuth;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onChange = (e) => {
        this.setState({ name: e.target.value });
    }

    onFileChange = (e) => {
        this.setState({ 
            image: e.target.files[0],
            showImage: window.URL.createObjectURL(e.target.files[0]),
            addImg: true 
        });
    }

    openModal = () => {
        this.setState({isOpen: true});
    }

    closeModal = () => {
        this.setState({isOpen: false});
    } 

    goBack = () => {
        window.location.hash="/";
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
              this.openModal();
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

    handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append("image", this.state.image);
        data.set("name", this.state.name);
        axios.post(URL + '/api/addCategory', data)
            .then(() => window.location.hash="/")
                .catch(error => console.log(error));
            
    }

    render() {
        let { isName, isNameValid, isImage } = this.state;

        return (
            <>
            {(this.state.isLoading) ? (
                <Loading />
            ) : (
            this.state.isAuth ? (
            <>
            <Header inHomepage={this.state.inHomepage}/>
                <section className="add-product-section small-container">
                    <div className="pg-title title"><h1>Add a New Category</h1></div>
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
                            Upload image:
                        </FormLabel> 
                    </Col>
                    <Col className="image-file-inEditForm">
                    <div className="input-wrap-inAddForm">
                        <FormControl className={"inputUpload", (isImage) ? "" : "warning-input" } type="file" accept="image/*" name="image" defaultValue={''} onChange= { this.onFileChange } />
                        <p className="warningMsg file-warning" style={{ display: (isImage) ? "none" : "inline-block" }} >Image is required</p>
                    </div>
                        <div className="image-wrap-inAddForm" style={{display: (this.state.addImg) ? "block" : "none"}}>
                            <img src={this.state.showImage}/>
                        </div>
                    </Col>
                </FormGroup>
                        <FormGroup as={Row} controlId="formHorizontalProduct" className="edit-Btns">
                            <SaveButton confirmEdit={this.confirmFields} title={"save"}/>
                            <GoBackButton name={"cancel"} confirmFunction={this.goBack}  authFunc={this.goBack} />
                        </FormGroup>
                    </Form>
                </section>
            <Footer />
            <Portal><Modal isOpen={this.state.isOpen} message={"Are you sure you want to add this item ?"} closeModal={this.closeModal} callFunction={this.handleSubmit}/></Portal>
            </>
            ) : (
                <>
                <Header inHomepage={this.state.inHomepage}/>
                    <section className="modal-section-noAuth">
                        <div className="background-div"></div>
                    </section>
                <Footer />
                <Portal><Modal header={"authorization restrictions"} message={"Please login or register in order to complete the action."} isOpen={true} closeModal={this.goBack} callFunction={this.loginPage} /></Portal>
                </>
            )
            )}
        </>
        )
    }
}

export default AddCategory;
