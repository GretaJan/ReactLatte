import React from "react";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Robot from '../../../images/sad-robot.png';

const PageNotFound = () => {
    return (
        <div className="pgNotFound">
            <Header />
            <div className="notFoundpg-flex-wrap">
                <div className="notFountPg-ContentWrap">
                    <h3>PAGE NOT FOUND...</h3>
                    <img src={Robot} /> 
                </div>
                <div className="footer-inNotFoundPg">
                    <Footer />
                </div>
            </div>
        </div>
    )

}

export default PageNotFound;