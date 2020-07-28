import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import MobileMenu from '../dropDowns/MobileMenu';
import OwlCarousel from './OwlCarousel';
import axios from 'axios';
import { URL } from '../helpers/url';


class Header extends Component {
    _isMounted = false;

    state = {
        isMobile: false,
        openMenu: false,
        isOpen: false,
        isLoggedIn: false,
        isAuth: false,
    }

    componentDidMount() {
        this._isMounted = true;
        const token = localStorage.getItem('user_token');

        if(token !== null) {
            this.setState({isAuth: true});
        }
        this.updateOnResize();
        window.addEventListener("resize", this.updateOnResize);
    }

    componentDidUpdate(prevState, prevProps) {
        return this.state.isAuth !== prevState.isAuth;
    }
    
    componentWillUnmount() {
        window.removeEventListener("rezise", this.updateOnResize);
        this._isMounted = false;
    }
    updateOnResize = () => {
        this.setState({ isMobile: window.innerWidth < 915 });
    }

    logOut = () => {
        const user_token = localStorage.getItem('user_token');
        axios.get(URL + '/api/logout', {headers: {'Authorization' : 'Bearer ' + user_token}}, {withCredentials: true})
           .then(() => {
               this.setState({isAuth: false})
               localStorage.removeItem('user_token');
               window.location.hash = '/';
            }).catch(err => 
                console.log(err.response))
    }

    openMenu = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
    render() {
        const isMobile = this.state.isMobile;

        var menuItems = ["Home", "Blog", "Events", "Store Locator", "Contact Us", "How to Purchase"];
        var menuLinks = ['/', '/blog', '/events', '/store', '/contacts', '/help'];

        const menuArray = menuItems.map((item, itemIndex) => {
            return <li key={itemIndex}>
            {menuLinks.map((link, linkIndex) => {
                if(itemIndex == linkIndex) {
                    return <Link  to={link}><h4>{item}</h4></Link>
                }
            }) }
        </li>
        })

        return (
            <header>
                <div className={(!this.props.inHomepage) ? "header-wrapper-background" : "header-wrapper-background-hp"}> 
                    <div className="header-lists-wrapper">
                    <span style={(!this.props.inHomepage) ? {"display": "none"} : {"display": "block"} }>
                        <OwlCarousel />
                    </span>
                        { (!isMobile) ? (
                        <span>
                        <div className="transparent-stripe"></div>
                            <div className="green-stripe"></div>
                                <div className={!this.state.isMobile ? "original-list" : "original-list-none" }>
                                    <ul className={!this.state.isMobile ? "first-list" : "original-list-none"}> 
                                        <li className="cursor" style={{display: !this.state.isAuth ? "inline-block" : "none"}}><Link to="/login"><span>Login</span></Link></li>
                                        <li className="cursor logout" style={{display: this.state.isAuth ? "inline-block" : "none"}} onClick={this.logOut}><span>Logout</span></li>
                                        <li className="registerLink" style={{display: !this.state.isAuth ? "inline-block" : "none"}}><Link to="/register"><span>Register</span></Link></li>
                                        <li style={{display: this.state.isAuth ? "inline-block" : "none"}} ><Link to="/profile"><span>Profile</span></Link></li>
                                        <li><Link to="https://facebook.com" ><span>Facebook</span></Link></li>
                                        <li className="cart"><Link to="#"><span>Cart</span></Link></li>
                                    </ul>
                                </div>
                                <div className="second-line"> 
                                    <div className="header-small-container">
                                        <div className="logo-main"><Link to="/">
                                            <img className="" src={logo} alt="main-logo" /></Link>
                                        </div>
                                        <div className="second-list">
                                            <ul className="second-list-ul"> 
                                                {menuArray}
                                            </ul>
                                        </div>
                                        </div>
                                    </div> 
                            </span>) : (
                            <MobileMenu openMenu={this.openMenu} isOpen={this.state.isOpen} isAuth={this.state.isAuth} logOut={this.logOut}/>
                            )}
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;