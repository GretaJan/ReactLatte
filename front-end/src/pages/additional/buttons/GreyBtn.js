import React, {useState} from 'react';

function GreyBtn(props) {
    const [hover, setHover] = useState(false);

    return (
        <div className="greyBtn" onClick={props.isAuth ? props.confirmFunction : props.authFunc} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <h5 className={(hover) ? "onHoverWhite": "" }>{props.name}</h5>
        </div>
    );
}

export default GreyBtn