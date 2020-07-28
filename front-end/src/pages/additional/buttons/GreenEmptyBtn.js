import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function GreenEmptyBtn({ title, link, classNameOne, isAuth, authFunc }) {
    const [hover, setHover] = useState(false);

    return (
        <div className={classNameOne}>
            <Link to={ (!isAuth) ? '#' : link}>
                <div className="green-emptyBtn" onClick={ (!isAuth) ? authFunc : null } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <h5 className={(hover) ? "onHoverWhite" : ""} >{ title }</h5>
                </div>
            </Link>
        </div>
    );

}
export default GreenEmptyBtn
