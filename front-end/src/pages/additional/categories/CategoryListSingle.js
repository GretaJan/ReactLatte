import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class CategorySingle extends Component {


    render() {  

        return (
            <li>
                   
        <h4><Link to={`/category/${this.props.category.id}`} target="_blank"> { this.props.category.name} </Link></h4>   
                
            </li>
            
        )
    }
}

CategorySingle.propTypes = {
    category: PropTypes.object.isRequired,
}

export default CategorySingle;
