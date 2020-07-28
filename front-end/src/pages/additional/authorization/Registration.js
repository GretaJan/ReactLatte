import React, { Component } from 'react';
import { FormControl, FormGroup, FormLabel, Row, Col, Container, Form } from 'react-bootstrap';
import { Portal } from 'react-portal';
import SaveButton from '../buttons/SaveBtn';
import GoBackButton from '../buttons/GreyBtn';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import Modal from '../modals/Modal';
import axios from 'axios';
import { URL } from '../helpers/url';

class Registration extends Component {


    state = {
        isLoading: true,
        name: '',
        email:'',
        password:'',
        password_confirmation: '',
        isOpen: false,
        //form name
        isName: true,
        isNameValid: true,
        //email
        isEmail: true,
        isEmailValid: true,
        //password
        isPassword: true,
        isPasswordValid: true,
        isSame: true,
        isSameValid: true,
        userExists: false, 

    }

    componentWillMount() {

        window.addEventListener('beforeunload', this.componentCleanup);
        this.setState({isLoading: false});

    }

    componentDidUpdate(prevState, prevProps) {
        return this.state.value == prevState.value;
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.componentCleanup); 
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    goBack = () => {
        window.location.hash='/';
    }

    openModal = () => {
        this.setState({isOpen: true});
    }

    closeModal = () => {
        this.setState({isOpen: false});
    }

    validation = () => {
        let { name, email, password, password_confirmation } = this.state;
        var regExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

        this.setState({isName: true, isNameValid: true, isEmail: true, isEmailValid: true, isPassword: true, isPasswordValid: true, isSame: true, isSameValid: true});

        if(name && email &&  password && password_confirmation) {

            if(name) {
                this.setState({isName: true});
            }
            if(email) {
                this.setState({isEmail: true});
            }
            if(password) {
                this.setState({isPassword: true});
            }
            if(password_confirmation) {
                this.setState({isSame: true});
            }

            if(name.length < 3 || name.length > 50) {
                this.setState({isNameValid: false});
            } else if(!email.match(regExp)) {
                this.setState({isEmailValid: false});
            } else if(password.length < 4) {
                this.setState({isPasswordValid: false});
            } else if(password !== password_confirmation) {
                this.setState({isSameValid: false});    
            } else {
                this.openModal();
            } 
        } else {
            if(!name) {
                this.setState({isName: false});
            } else if(name.length < 3 || name.length > 50) {
                this.setState({isNameValid: false});
            }
            if(!email) {
                this.setState({isEmail: false});
            } else if(!email.match(regExp)) {
                this.setState({isEmailValid: false});
            }
            if(!password) {
                this.setState({isPassword: false});
            } else if(password.length < 5) {
                this.setState({isPasswordValid: false});
            }
            if(!password_confirmation) {
                this.setState({isSame: false});
            } else if(password !== password_confirmation && password) {
                this.setState({isSameValid: false});
            } 
        }
    }

    handleSubmit = () => {

   const { name, email, password, password_confirmation } = this.state;
        
        const user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }

        axios.post(URL + '/api/register', user)
            .then(() => {
                window.location.hash="/login";
            }).catch((error) => {
               if(error.response.status == '422') {
                this.setState({userExists: true})
               }
            });
    }    


    render() {

        let { isLoading, name, email, password, password_confirmation, isName, isNameValid, isEmail, isEmailValid, isPassword, isPasswordValid, isSame, isSameValid, userExists } = this.state;

        return (
            <>
            {(isLoading) ? (
                <Loading />
            ) : (
            <>
            <Header inHomepage={this.state.inHomepage}/>
                <section className="add-product-section small-container">
                <div className="add-category-title"><h1>Registration</h1></div>
                <Form type='post'> 
                        <FormGroup as={Row} className="groupOfName">
                            <FormLabel>
                            Username:
                            </FormLabel>
                            <FormControl className={"inputName", (isName && isNameValid) ? "" : "warning-input" } type="text" name="name" value={ name } onChange= { this.onChange } />
                            <p className="warningMsg name-warning" style={{ display: (isName) ? "none" : "inline-block" }} >Username is required</p>
                            <p className="warningMsg name-characters-warning" style={{ display: (isNameValid) ? "none" : "inline-block" }} >Username must contain at least 3 and no more than 50 characters</p>
                        </FormGroup>
                        <FormGroup as={Row} className="groupOfName">
                            <FormLabel>
                            Email:
                            </FormLabel>
                            <FormControl className={"inputName", (isEmail && isEmailValid) ? "" : "warning-input" } type="text" name="email" value={ email } onChange= { this.onChange } />
                            <p className="warningMsg name-warning" style={{ display: (isEmail) ? "none" : "inline-block" }} >Email is required</p>
                            <p className="warningMsg name-characters-warning" style={{ display: (isEmailValid) ? "none" : "inline-block" }} >Invalid email format</p>
                        </FormGroup>
                        <FormGroup as={Row} className="groupOfName">
                            <FormLabel>
                            Password:
                            </FormLabel>
                            <FormControl className={"inputName", (isPassword && isPasswordValid) ? "" : "warning-input" } type="password" name="password" value={ password } onChange= { this.onChange } />
                            <p className="warningMsg name-warning" style={{ display: (isPassword) ? "none" : "inline-block" }} >Password is required</p>
                            <p className="warningMsg name-characters-warning" style={{ display: (isPasswordValid) ? "none" : "inline-block" }} >Password must contain at least 5 characters</p>
                        </FormGroup>
                        <FormGroup as={Row} className="groupOfName">
                            <FormLabel>
                            Confirm password:
                            </FormLabel>
                            <FormControl className={"inputName", (isSame && isSameValid) ? "" : "warning-input" } type="password" name="password_confirmation" value={ password_confirmation } onChange= { this.onChange } />
                            <p className="warningMsg name-warning" style={{ display: (isSame) ? "none" : "inline-block" }} >Please re-enter the password</p>
                            <p className="warningMsg name-characters-warning" style={{ display: (isSameValid) ? "none" : "inline-block" }} >Must be the same as the original password</p>
                        </FormGroup>
                        <p className="warningMsg name-warning" style={{display: userExists ? "block" : "none"}}> User with this email already exists.</p>
                        <FormGroup as={Row} controlId="formHorizontalProduct" className="edit-Btns">
                            <SaveButton confirmEdit={this.validation} title={"save"}/>
                            <GoBackButton name={"cancel"}  isAuth={this.state.isAuth} confirmFunction={this.goBack} authFunc={this.goBack}/>
                        </FormGroup>
                    </Form>
                </section>
            <Footer />
            <Portal><Modal isOpen={this.state.isOpen} message={"Are you sure you want to register a new user ?"} closeModal={this.closeModal} callFunction={this.handleSubmit}/></Portal>
            </>
            )
        }
        </>
        )

    }
}

export default Registration