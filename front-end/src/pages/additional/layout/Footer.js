import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer>
            <section className="footer-small-container">
                <div className="main-footer-wrap-flexbox">
                    <div className="footer-flex-one">
                            <h5>FIRST COLUMN</h5>
                        <ul>
                            <li className="footer-inner-row-flexbox">
                                <p className="date-footer">17 NOV</p>
                                <div className="second-innerflex-row-item">
                                    <h4>Semper feugiat nibh sed</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing iqua.</p>
                                    <p>View more..</p>
                                </div>
                            </li>
                            <li className="footer-inner-row-flexbox">
                                <p className="date-footer">17 NOV</p>
                                <div className="second-innerflex-row-item">
                                    <h4>Mauris a diam maecenas sed enim ut</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur, dolore magna aliqua.</p>
                                    <p>View more..</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-flex-two" >
                        <h5>SECOND COLUMN</h5>
                        <ul>
                            <li>
                                <ul>
                                    <li>
                                        <p><FontAwesomeIcon icon={faHome} /></p>
                                        <ul className="mobile-inline-block-one">
                                            <li><p>Adress line one</p></li>
                                            <li><p>Addressline two</p></li>
                                            <li><p>Zip code</p></li>
                                        </ul>
                                    </li>
                                    <div className="mobile-inline-block-one">
                                    <ul>
                                        <li><a href="tel:+37062119657"><p><FontAwesomeIcon icon={faPhone} /> +370 62 119657</p></a></li>
                                    </ul>
                                    <ul>
                                        <li><a href="mailto:gretajan09@gmail.com"><p><FontAwesomeIcon icon={faEnvelope} /> Gretajan09@gmail.com</p></a></li>
                                    </ul>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>    
                <div className="copy-rights-wrap">
                    <div className="empty-div"></div>
                    <div className="copy-rights"><p>&copy; Developed by	<a href="https://grejan.lt">GreJan Code</a></p></div>
                </div>
            </section>
        </footer>
    )
}

export default Footer