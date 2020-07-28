import React, { Component } from 'react';
import CategorySingle from './CategoryIndexSingle';
import PropTypes from 'prop-types';


class Categories extends Component {


  render() {
    return (
      <section className="all-categories-section">
          <div  className="small-container">
            <div>
              {!this.props.noCategories ? (
                <ul className="categories-all-wrap">
                  {this.props.categories.map((category) => ( 
                        <CategorySingle key={category.id} category={category}/>
                  ))}
                </ul>
              ) : (
                <p>Store has  no categories at current time...</p>
              )}  
          </div>
        </div>
    </section>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories;
