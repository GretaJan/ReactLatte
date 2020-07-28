import React, { Component } from 'react';
import FormCategorySingle from './FormCategorySingle';
import PropTypes from 'prop-types';

class FormCategories extends Component {


  render() {
    return (
      <>
        { this.props.categories.map((category) => ( 
          <FormCategorySingle key={category.id} category={category}/>
        )) }
      </>
    );
  }
}

FormCategories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default FormCategories;
