import React, { Component } from 'react';
import { URL } from '../helpers/url';
import { Form, FormGroup, FormControl, FormLabel, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import FormCategories from './FormCategories';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import { Portal } from 'react-portal';
import Modal from '../modals/Modal';
import SaveButton from '../buttons/SaveBtn';
import GoBackButton from '../buttons/GreyBtn';

class AddCategory extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
            title: '',
            image: '',
            showImage: '',
            original_price: '',
            lower_price: '',
            description: EditorState.createEmpty(),
            categories: [],
            titleNone: false,
            inHomepage: false,
            isLoading: true,
            isOpen: false,
            addImg: false,
            // validate title
            isTitle: true,
            isTitleValid: true,
            // original price
            isOriginal: true,
            isOriginalValid: true,
            //lower price
            isLower: true,
            isLowerValid: true,
            // description
            isDescription: true,
            isDescriptionValid: true,
            //Image
            isImage: true,
            //Auth
            isAuth: false,
            noCategories: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const token = localStorage.getItem('user_token');

        if(token !== null) {
            this.setState({isAuth: true})
        } else {
            this.setState({isAuth: false});
        }

        setTimeout(() => {
            axios.get(URL + '/api/categories')
            .then((response) => {
                if(!response.data.length) {
                    this.setState({ noCategories: true, isLoading: false });
                } else {
                    this.setState({categories: response.data});
                    this.setState({category_id: response.data[0].id, isLoading: false});
                } 
            }).catch(error => console.log(error))
            }, 600)
       
    }

    componendDidUpdate(prevState) {
        return this.state.isAuth !== prevState.isAuth || this.state.categories.length !== prevState.categories.length;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});

    }

    onChangeDescription = (description) => {
        const contentState = description.getCurrentContent();
        this.setState({ description });
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

    addCategory = () => {
        window.location.hash="/addCategory/";
    }

    loginPage = () => {
        window.location.hash="/login";
    }

    confirmFields = () => {
        var regExp = new RegExp(/^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)*$/);
        this.setState({isTitle: true, isTitleValid: true, isOriginal: true, isOriginalValid: true, isLower: true, isLowerValid: true, isDescription: true, isDescriptionValid: true,isImage: true});

        if (this.state.title && this.state.original_price && this.state.lower_price && this.state.description.getCurrentContent().getPlainText() && this.state.category_id && this.state.image) {
            this.setState({isTitle: true, isTitleValid: true, isOriginal: true, isOriginalValid: true, isLower: true, isLowerValid: true, isDescription: true, isDescriptionValid: true,isImage: true});
            if(this.state.title.length < 3 || this.state.title.length > 50  ) {
                this.setState({isTitleValid: false})
            } else if(!this.state.original_price.match(regExp)) {
                this.setState({isOriginalValid: false})
            } else if(!this.state.lower_price.match(regExp)) {
                this.setState({isLowerValid: false})
            } else if(this.state.description.getCurrentContent().getPlainText().length < 15) {
                this.setState({isDescriptionValid: false})
            } else {
                this.openModal();   
            }
        } else {
            if(!this.state.title) {
                this.setState({isTitle: false})
            } else if(this.state.title.length < 3 || this.state.title.length > 50  ) {
                this.setState({isTitleValid: false})
            }

            if(!this.state.original_price) {
                this.setState({isOriginal: false})
            }  else if(!this.state.original_price.match(regExp)) {
                this.setState({isOriginalValid: false})
            }

            if(!this.state.lower_price) {
                this.setState({isLower: false})
            } else if(!this.state.lower_price.match(regExp)) {
                this.setState({isLowerValid: false})
            } 
            if(!this.state.description.getCurrentContent().getPlainText()) {
                this.setState({isDescription: false})
            } else if(this.state.description.getCurrentContent().getPlainText().length < 15) {
                this.setState({isDescriptionValid: false})
            }
            if(!this.state.image) {
                this.setState({isImage: false})
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    
        let data = new FormData();
        data.append("image", this.state.image);
        data.set("title", this.state.title);
        data.set("original_price", this.state.original_price);
        data.set("lower_price", this.state.lower_price);
        data.set("description", JSON.stringify(convertToRaw(this.state.description.getCurrentContent())));
        data.set("category_id", this.state.category_id);

            axios.post(URL + '/api/addProduct', data)
            .then(() => window.location.hash = "/").catch(error => console.log(error));
        
    }


    render() {
        let { isTitle, isTitleValid, isOriginal, isOriginalValid, isLower, isLowerValid, isDescription, isDescriptionValid, isImage } = this.state;

        var categoryOptsName = [];
        var categoryOptsValue = [];
        
        this.state.categories.map((category) => {
            categoryOptsName.push(category.name);
            categoryOptsValue.push(category.id);
        });
           
        return (  
            <>
            {this.state.isLoading ? (
                <Loading />
            ) : (
                (!this.state.noCategories) ? (
                    this.state.isAuth ? (
                        <>
                        <Header inHomepage={this.state.inHomepage}/>
                            <section className="add-product-section small-container">
                                <div className="pg-title title"><h1>Add a New Product</h1></div>
                                <Form className="large-form" onSubmit={this.handleSubmit} type='post'> 
                                    <FormGroup as={Row} className="groupOfTitle">
                                        <FormLabel>
                                        Title:
                                        </FormLabel>
                                        <FormControl className={"inputTitle", (isTitle && isTitleValid) ? "" : "warning-input" } type="text" name="title" value={ this.state.title } onChange= { this.onChange }/>
                                    <p className="warningMsg title-warning" style={{ display: (isTitle) ? "none" : "inline-block" }}>Title is required</p>
                                    <p className="warningMsg title-characters-warning" style={{ display: (isTitleValid) ? "none" : "inline-block" }} >Title must contain at least 3 and no more than 50 characters</p>
                                    </FormGroup>
                                    <FormGroup as={Row}className="groupOrigPrice">
                                        <FormLabel>
                                            Original price:
                                        </FormLabel>
                                            <FormControl className={"inputOriginalPrice", (isOriginal && isOriginalValid) ? "" : "warning-input" } type="text" name="original_price" value={ this.state.original_price } onChange= { this.onChange }/>
                                            <p className="warningMsg originalPrice-warning" style={{ display: (isOriginal) ? "none" : "inline-block" }}>Original price is required</p>
                                            <p className="warningMsg originalPrice-numeric-warning" style={{ display: (isOriginalValid) ? "none" : "inline-block" }}>Decimal numbers accepted only</p>
                                    </FormGroup>
                                    <FormGroup as={Row} className="groupOfLowerPrice">
                                        <FormLabel>
                                            Lower price:
                                        </FormLabel>
                                            <FormControl className={"inputLowerPrice", (isLower && isLowerValid) ? "" : "warning-input" } type="text" name="lower_price" value={ this.state.lower_price } onChange= { this.onChange }/>
                                            <p className="warningMsg lowerPrice-warning" style={{ display: (isLower) ? "none" : "inline-block" }} >Lower price is required</p>
                                            <p className="warningMsg lowerPrice-numeric-warning" style={{ display: (isLowerValid) ? "none" : "inline-block" }}>Decimal numbers accepted only</p>
                                    </FormGroup>
                                    <FormGroup as={Row} className="groupOfDescription">
                                        <FormLabel>
                                            Description:
                                        </FormLabel>
                                            <Editor className={"inputDescription", (isDescription && isDescriptionValid) ? "" : "warning-input" }
                                                editorState={this.state.description}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={this.onChangeDescription}
                                            />
                                            <p className="warningMsg description-warning" style={{ display: (isDescription) ? "none" : "inline-block" }} >Description is required</p>
                                            <p className="warningMsg description-size-warning" style={{ display: (isDescriptionValid) ? "none" : "inline-block" }} >Field must contain at least 15 characters</p>
                                    </FormGroup>
                                    <FormGroup as={Row}  className="groupOfCategoryList">
                                        <Col sm={6}>
                                            <FormLabel>
                                                Category list: 
                                            </FormLabel>
                                            <FormControl className="inputCategories" as="select" name="category_id" onChange={this.onChange}>
                                            <FormCategories categories={this.state.categories} />
                                            </FormControl>
                                            <p className="warningMsg category-warning">Category is required</p>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup as={Row}  className="groupOfCategoryList">
                                        <Col sm="12" className="addImg-col">
                                        <FormLabel className="titleOfUpload">
                                            Upload image:
                                        </FormLabel> 
                                    </Col>
                                    <Col className="image-file-inEditForm">
                                        <div className="input-wrap-inAddForm">
                                            <FormControl className={"inputUpload", (isImage) ? "" : "warning-input" } type="file" accept="image/*" name="image" defaultValue={''} onChange= { this.onFileChange } />
                                            <p className="warningMsg file-warning" style={{ display: (isImage) ? "none" : "inline-block" }}  >Image is required</p>
                                        </div>
                                        <div className="image-wrap-inAddForm" style={{display: (this.state.addImg) ? "block" : "none"}}>
                                            <img src={this.state.showImage}/>
                                        </div>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup as={Row} controlId="formHorizontalProduct" className="edit-Btns">
                                        <SaveButton confirmEdit={this.confirmFields} title={"save"}/>
                                        <GoBackButton name={"cancel"} confirmFunction={this.goBack} authFunc={this.goBack} />
                                    </FormGroup>
                                </Form>
                            </section>
                        <Footer />
                        <Portal><Modal header="Confirm action" isOpen={this.state.isOpen} message={"Are you sure you want to add this item ?"} closeModal={this.closeModal} callFunction={this.handleSubmit}/></Portal>
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
                ) : (
                    <>
                    <Header inHomepage={this.state.inHomepage}/>
                            <section className="modal-section-noAuth">
                                <div className="background-div"></div>
                            </section>
                        <Footer />
                        <Portal><Modal header={"Missing data"} message={"Store has no categories. Do you wish to add a category first? "} isOpen={true} closeModal={this.goBack} callFunction={this.addCategory} /></Portal> 
                    </>
                )
                
            )}
        </>
        )
    }
}


export default AddCategory;
