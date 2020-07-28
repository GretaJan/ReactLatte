import React, {Component} from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loading from '../modals/Loading';
import Modal from '../modals/Modal';
import axios from 'axios';
import { Portal } from 'react-portal';
import { URL } from '../helpers/url';

class User extends Component {
    _isMounted = false;

    state = {
        isLoading: true,
        name:'',
        email:'',
        isAuth: null,
        isOpen: null,
        isOpenAuth: null,
        token: localStorage.getItem('user_token')
    }

    async componentDidMount() {
            if(this.state.token !== null || this.state.token !== 'undefined') {
              await axios.get(URL + '/api/user', {headers: {'Authorization' : 'Bearer ' + this.state.token}}, {withCredentials: true})
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        email: response.data.email,
                        isAuth: true
                    });
                    this._isMounted = true;
                  }).catch(err => {
                      this.setState({
                        name: '',
                        email: '',
                        isAuth: false, 
                        token: null
                      })
                  });
            } else {
                this.setState({
                    name: '',
                    email: '',
                    isAuth: false
                })
            }
        this.setState({isLoading: false});

    }

    componentDidUpdate(prevState) {
        return this.state.token !== prevState.token || this.state.email !== prevState.email;
    }

    componentWillUnmount() {
        this._isMounted  = false;
    }

    closeModalAuth = () => {
        window.location.hash="/";
    }

    loginPage = () => {
        window.location.hash="/login";
    }

    render() {
        let {isAuth, isLoading, name, email} = this.state
        return (
            <>
            {(isLoading) ? (
                <Loading />
            ) : (
            (isAuth) ? (
                <>
                <Header inHomepage={this.state.inHomepage}/>
                <section className="profile-section small-container">
                    <div className="section-after-header">
                        <h1>Welcome to you profile page, dear {name}</h1>
                        <h4>You Email address is: {email}</h4>
                    </div>
                </section>
            <Footer />
            </>
            ) : (
            <>
            <Header inHomepage={this.state.inHomepage}/>
                <section className="modal-section-noAuth small-container">
                    <div className="background-div"></div>
                </section>
            <Footer />
            <Portal><Modal header={"authorization restrictions"} message={"Please login or register in order to complete the action."} isOpen={true} closeModal={this.closeModalAuth} callFunction={this.loginPage} /></Portal>
            </>
            )
        )}
        </>
        )
    }
}

export default User