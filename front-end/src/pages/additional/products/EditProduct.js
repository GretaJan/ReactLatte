import React, { Component } from 'react';
import { URL } from '../helpers/url';
import { Form, Col, FormGroup, FormLabel, Row, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import Loading from '../modals/Loading';
import { Link}  from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Portal } from 'react-portal';
import Modal from '../modals/Modal';
import SaveButton from '../buttons/SaveBtn';
import GoBackButton from '../buttons/GreyBtn';


class EditProduct extends Component {
    _isMounted =  false;
    state = {
        id: this.props.match.params.productId,
        category_id: '',
        categoryName: '',
        title: '',
        image: '',
        newImage: '',
        choseNewImg: false,
        original_price: '',
        lower_price: '',
        description: EditorState.createEmpty(),
        loading: true,
        titleNone: false,
        inHomepage: false,
        isOpen: false,
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
    }

    componentDidMount() {
        this._isMounted = true;
        const token = localStorage.getItem('user_token');

        if(token !== null) {
            this.setState({isAuth: true})
        } else {
            this.setState({isAuth: false});
        }

        const requestOne = axios.get(URL + '/api/product/'+ this.props.match.params.productId + '/' + this.props.match.params.category_Id);
        const requestTwo = axios.get(URL + '/api/category/' + this.props.match.params.category_Id);
        setTimeout(() => {
            axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                const responseOne = responses[0];
                const responseTwo = responses[1]; 
            this.setState({
                title: responseOne.data.title, 
                image: responseOne.data.image,
                original_price: responseOne.data.original_price, 
                lower_price: responseOne.data.lower_price, 
                description: EditorState.createWithContent(convertFromRaw(JSON.parse(responseOne.data.description))),
                categoryName: responseTwo.data.name,
                category_id: responseTwo.data.id,  
                loading: false
                })
            })
            ).then(err => console.log(err), this.setState({loading: false}))
        }, 1200);
    }
    componendDidUpdate(prevState, prevProps) {
            return this.state.isAuth !== prevState.isAuth;
        }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onChangeDescription = (description) => {
        this.setState({description})
    }

    onFileChange = (e) => {
        this.setState({ 
            image: e.target.files[0],
            newImage: window.URL.createObjectURL(e.target.files[0]),
            choseNewImg: true 
        });
    }

    closeModal = () => {
        this.setState({isOpen : false});
    }

    openModal = () => {
        this.setState({isOpen: true});
    }

    goBack = () => {
        window.location.hash="/product/" + this.props.match.params.productId + '/' + this.props.match.params.category_Id;
    }

    loginPage = () => {
        window.location.hash="/login";
    }

    confirmFields = () => {
        this.setState({isOpen: false});
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
                this.setState({isTitle: true, isTitleValid: true, isOriginal: true, isOriginalValid: true, isLower: true, isLowerValid: true, isDescription: true, isDescriptionValid: true,isImage: true});
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
                this.setState({isDescription: false, isDescriptionValid: true });
            } else if(!this.state.description.getCurrentContent().getPlainText().length < 15) {
                this.setState({isDescriptionValid: false})
            }
            if(!this.state.image) {
                this.setState({isImage: false})
            }
        }
    }

    handleUpdate = () => {

        let data = new FormData();
        if(this.state.image !== typeof(string)) {
            data.append("image", this.state.image);
        } else {
            data.set("image", this.state.image);
 
        }
        data.set("title", this.state.title);
        data.set("original_price", this.state.original_price);
        data.set("lower_price", this.state.lower_price);
        data.set("description", JSON.stringify(convertToRaw(this.state.description.getCurrentContent())));
        data.set('_method', 'PUT');
        axios.post(URL + '/api/product/' + this.props.match.params.productId + '/' + this.props.match.params.category_Id, data)
        .then(() => window.location.hash="/product/" + this.props.match.params.productId + "/" + this.props.match.params.category_Id).catch((error) => alert(error));
    }

    render() {
        let { choseNewImg, isTitle, isTitleValid, isOriginal, isOriginalValid, isLower, isLowerValid, isDescription, isDescriptionValid, isImage } = this.state;

        return (
            <>
                {(this.state.loading) ? (
                    <Loading />
                ) : (
                    this.state.isAuth ? (
                    <>
                    <Header inHomepage={this.state.inHomepage} />
                    <section className="small-container">
                        <div className="add-category-title"><h1>Edit Product </h1></div>
                        <div className="categoryIndicator-inEdit"><p>Category: <Link to={`/category/${this.state.category_id}`}>{this.state.categoryName}</Link></p></div>
                        <Form className="large-form" type='post'> 
                            <FormGroup as={Row} className="groupOfTitle">
                                <FormLabel>
                                Title:
                                </FormLabel>
                                <FormControl className={"inputTitle", (isTitle && isTitleValid) ? "" : "warning-input" } type="text" name="title" value={ this.state.title } onChange= { this.onChange }/>
                                <p className="warningMsg title-warning" style={{ display: (isTitle) ? "none" : "inline-block" }}>Title is required</p>
                                <p className="warningMsg title-characters-warning" style={{ display: (isTitleValid) ? "none" : "inline-block" }} >Title must contain at least 3 and no more than 50 characters</p>
                            </FormGroup>
                            <FormGroup as={Row} className="groupOrigPrice">
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
                                    <Editor 
                                        editorState={this.state.description}
                                        toolbarClassName="toolbarClassName"
                                        toolbarHidden={false}
                                        toolbarOnFocus={false}
                                        contentEditable={true}
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onChangeDescription}
                                    />
                                    <p className="warningMsg description-warning" style={{ display: (isDescription) ? "none" : "inline-block" }} >Description is required</p>
                                    <p className="warningMsg description-size-warning" style={{ display: (isDescriptionValid) ? "none" : "inline-block" }} >Field must contain at least 15 characters</p>
                            </FormGroup>
                            <FormGroup as={Row}  className="groupOfCategoryList">
                                <Col sm="12" className="image-update-title addImg-col">
                                    <FormLabel className="titleOfUpload">
                                        Update image:
                                    </FormLabel> 
                                </Col>
                                <Col className="img-editProduct-col">
                                    <div className="image-wrap-inEditForm">
                                        <img style={{ display: choseNewImg ? "none": "block" }} src={this.state.image}/>
                                        <img style={{ display: choseNewImg ? "block": "none" }} src={this.state.newImage}/>
                                    </div>
                                </Col>
                                <Col className="file-input-inProductUpdate">
                                    <FormControl className={"inputUpload", (isImage) ? "" : "warning-input" } type="file" accept="image/*" name="image" defaultValue={''} onChange= { this.onFileChange } />
                                    <p className="warningMsg file-warning" style={{ display: (isImage) ? "none" : "inline-block" }} >Image is required</p>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row} controlId="formHorizontalProduct" className="edit-Btns">
                                    <SaveButton confirmEdit={this.confirmFields} title={"save"}/>
                                    <GoBackButton name={"cancel"} isAuth={this.props.isAuth}  confirmFunction={this.goBack} authFunc={this.goBack}/>
                        </FormGroup>
                    </Form>
                </section>
                <Footer />
                <Portal><Modal isOpen={this.state.isOpen} message={"Are you sure you want to update this item ?"} closeModal={this.closeModal} callFunction={this.handleUpdate}/></Portal>
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

export default EditProduct
