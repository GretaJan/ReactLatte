import React, { useState } from 'react';

const SaveButton = ({confirmEdit, title, isAuth, authfunc}) => {
    const [hover, setHover] = useState(false);

    return (
        <div className="saveBtn" onClick={!isAuth ? authfunc : ''} style={{width: "131px"}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={confirmEdit}>
            <h5 className={(hover) ? "onHoverWhite" : ""} >{ title }</h5>
        </div>
    )
}

export default SaveButton