import React, { Component } from 'react';
import CategorySingle from './CategoryListSingle';
import PropTypes from 'prop-types';

class Categories extends Component {


  render() {
    return (
      < section className="small-container">
        { this.props.categories.map((category) => ( 
          <CategorySingle key={category.id} key={this.props.randomNum} category={category} />
        )) }
      </ section>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories;
