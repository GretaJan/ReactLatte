import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class DropDown extends Component {

    render() {
        return (
            <>
                <li><Link to={`/category/${this.props.category.id}`}>{this.props.category.name}</Link></li>
            </>
        )
    }
}

export default DropDown