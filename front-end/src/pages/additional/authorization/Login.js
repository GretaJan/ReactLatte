import React, { Component } from 'react';
import { FormControl, FormGroup, FormLabel, Row, Form, Button } from 'react-bootstrap';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import LoginBtn from '../buttons/SaveBtn';
import CancelBtn from '../buttons/GreyBtn';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import Modal from '../modals/Modal';
import axios from 'axios';
import { URL } from '../helpers/url';


class Login extends Component {

    _isMounted = false;

    state = {
        isLoading: true,
        email:'',
        password:'',
        incorrectCredentials: '',
        isAuth: false,
        isOpen: false,
        isOpenAuth: false,
    }

    componentDidMount() {

        setTimeout(() => {
            this._isMounted = true;
            const token = localStorage.getItem('user_token');
    
            if(token !== null) {
            this.setState({isAuth: true});
            } else {
            this.setState({isAuth: false});
            }
            this.setState({isLoading: false})
        }, 600)
    }

    componentDidUpdate(prevState) {
        return this.state.isAuth !== prevState.isAuth;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value,
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeRemember_me = (e) => {
        this.setState({
            remember_me: !this.state.remember_me
        });
    }

    confirmFields = () => {
        this.setState({isOpen: true})
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

    openModalAuth = () => {
        this.setState({isOpenAuth: true});
    }

    closeModalAuth = () => {
        this.setState({isOpenAuth: false});
    }

    logOut = () => {
        const user_token = localStorage.getItem('user_token');
        axios.get(URL + '/api/logout', {headers: {'Authorization' : 'Bearer ' + user_token }}, {withCredentials: true})
           .then(() => {
                this.setState({isAuth: false})
                localStorage.removeItem('user_token');
                window.location.hash = '/';
            }).catch(err => console.log(err.response))
    }

    handleSubmit = () => {
    const { email, password } = this.state;
        const loggedUser = {
            email: email,
            password: password,
        }
       axios.post(URL + '/api/login', loggedUser, {withCredentials: true})
            .then(response => { 
                this.setState({ incorrectCredentials: ''})
                localStorage.setItem('user_token', response.data.access_token);
                this.goBack();
            })
                .catch(err => {
                    if(err === 422) {
                        this.setState({ incorrectCredentials: 'User not found. Please try again.'})
                    } else {
                        this.setState({ incorrectCredentials: 'Unexpected system errors have occurred. Please try again'})
                    }

                })
    }    


    render() {
        let { isLoading, email, password, isAuth } = this.state;

        return (
            <>
            {(isLoading) ? (
                <Loading />
            ) : (
            (!isAuth) ? (
                <>
                <Header inHomepage={this.state.inHomepage}/>
                <section className="add-product-section small-container">
                <div className="add-category-title"><h1>Login</h1></div>
                <Form onSubmit={this.handleSubmit} type='post'> 
                        <FormGroup className="groupOfName">
                            <FormLabel>
                            Email:
                            </FormLabel>
                            <FormControl className="inputName" type="text" name="email" value={ email } onChange= { this.onChangeEmail } />
                        </FormGroup>
                        <FormGroup className="groupOfName password-login">
                            <FormLabel>
                            Password:
                            </FormLabel>
                            <FormControl className="inputName" type="password" name="password" value={ password } onChange= { this.onChangePassword } />
                        </FormGroup>
            <p className="warningMsg name-warning" style={{display: this.state.incorrectCredentials === '' ? "none" : "block"}}>{ this.state.incorrectCredentials }</p>
                        <FormGroup controlId="formHorizontalProduct" className="edit-Btns">
                            <LoginBtn confirmEdit={this.handleSubmit} title={"Login"}/>
                            <CancelBtn name={"cancel"} authFunc={this.goBack} />
                        </FormGroup>
                        <FormGroup controlId="formHorizontalProduct" className="edit-Btns">
                        <Link to="/register"><Button variant="light"><h3>Register</h3></Button></Link>
                        </FormGroup>
                    </Form>
                </section>
            <Footer />
            </>
            ) : (
            <>
            <Header inHomepage={this.state.inHomepage}/>
                <section className="modal-section-noAuth">
                    <div className="background-div"></div>
                </section>
            <Footer />
            <Portal><Modal header={"Login Page"} message={"You are already logged in. Do you wish to logout ?"} isOpen={true} closeModal={this.goBack} callFunction={this.logOut} /></Portal>
            </>
            )
        )}
        </>
        )

    }
}

export default Login