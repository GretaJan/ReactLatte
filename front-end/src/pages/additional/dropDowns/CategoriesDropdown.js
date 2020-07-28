import React from 'react';
import { Link } from 'react-router-dom';

function DropDown(props) {
    return (
        <li>
            <Link to={`/category/${props.category.id}`}><p>{props.category.name}</p></Link>
        </li>
    )
}

export default DropDown