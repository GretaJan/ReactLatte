import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

function MobileMenu({ openMenu, isOpen, isAuth, logOut }) {
    var menuItems = ["Home", "Blog", "Events", "Store Locator", "Contact Us", "How to Purchase"];
    var menuLinks = ['/', '/blog', '/events', '/store', '/contacts', '/help'];

    const menuArray = menuItems.map((item, itemIndex) => {
        return <li key={itemIndex}>
        {menuLinks.map((link, linkIndex) => {
            if(itemIndex == linkIndex) {
                return <Link key={linkIndex} to={link} onClick={openMenu}><h4>{item}</h4></Link>

            }
        }) }
       </li>
    })
    
    return (
        <section className="mobile-menu-section">
                <div className="logo-mobile-menu"><Link to="/"><img className="" src={logo} alt="main-logo" /></Link></div>
                <div className="hamburger"><FontAwesomeIcon icon={faBars} className="cursor" onClick={openMenu} style={!isOpen ? {"display": "block"} : {"display": "none"}}/>
                <FontAwesomeIcon icon={faTimes} className="cursor" onClick={openMenu} style={isOpen ? {"display": "block"} : {"display": "none"}}/></div>
                <div className={isOpen ? "openMenu" : "closedMenu" }>
                    <div>
                        <ul className="first-list-mobile"> 
                                        <li key={1} style={{display: !isAuth ? "inline-block" : "none"}}><Link to="/login"><span>Login</span></Link></li>
                                        <li key={2}  className="cursor logout" style={{display: isAuth ? "inline-block" : "none"}} onClick={logOut}><span>Logout</span></li>
                                        <li key={3} style={{display: !isAuth ? "inline-block" : "none"}}><Link to="/register"><span>Register</span></Link></li>
                                        <li key={4} style={{display: isAuth ? "inline-block" : "none"}} ><Link to="/profile"><span>Profile</span></Link></li>
                                        <li key={5} ><Link to="https://www.facebook.com"><span>Facebook</span></Link></li>
                                        <li key={6} className="cart"><Link to="/cart"><span>Cart</span></Link></li>
                                    </ul>
                        <ul className="second-list-mobile">
                            {menuArray}
                        </ul> 
                    </div>
                </div>
        </section>
    )
}

export default MobileMenu