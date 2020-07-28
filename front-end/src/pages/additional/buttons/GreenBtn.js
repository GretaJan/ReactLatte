import React, {useState} from 'react';
import { Button } from "react-bootstrap";


function GreenBtn({title, classNameHover, isAuth, authFunc}){
    const [hover, setHover] = useState(false);

    return (
        <div onClick={!isAuth ? authFunc : ''} className={"link-btn-product-details", classNameHover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Button variant="success">
                <h5 className={(hover) ? "onHoverWhite": ""}>{title}</h5>
            </Button>
        </div>
    )
}

export default GreenBtn