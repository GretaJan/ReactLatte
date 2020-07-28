import React, { Component } from 'react';
import PropTypes from 'prop-types';


class FormCategorySingle extends Component {


    render() {  
        return (
            <>
            <option value={this.props.category.id}>{this.props.category.name}</option>
            </>
        )
    }
}

FormCategorySingle.propTypes = {
    category: PropTypes.object.isRequired,
}

export default FormCategorySingle;
