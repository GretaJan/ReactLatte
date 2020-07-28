import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const Modal = (props) => {
    const [hoverFirst, setHoverFirst] = useState(false);
    const [hoverSecond, setHoversecond] = useState(false);

    return (
        <div className={props.isOpen ? "display modal-background-wrap" : "hide"}>
            <div className="modal-background">
                <div className="modal-window-wrap-wrap">
                    <div className="modal-window-wrap">
                        <div className="confirm-firstLine-wrap">
                            <h3 className="headerText">{props.header}</h3>
                            <FontAwesomeIcon icon={faTimes} onClick={props.closeModal}/>
                        </div>
                        <div className="confirm-secondLine-wrap">
                            <h4>{props.message} {props.title}</h4>
                            <div className="modal-btn-wrap">
                                <div className="empty-flex-item"></div>
                                <div className="btn-first" >
                                    <div className="yellowBtn" onClick={props.callFunction} onMouseEnter={() => setHoverFirst(true) } onMouseLeave={() => setHoverFirst(false) }>
                                        <h5 style={{ color: hoverFirst ? '#ffc107' : '#ffffff' }}>Confirm</h5>
                                    </div>
                                </div>
                                <div className="btn-second">
                                    <div className="darkGreyBtn" onClick={props.closeModal} onMouseEnter={() => setHoversecond(true) } onMouseLeave={() => setHoversecond(false) }>
                                        <h5 style={{ color: hoverSecond ? '#6c757d' : 'rgb(231, 229, 229)' }}>Cancel</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;