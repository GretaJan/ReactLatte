import React, { Component } from 'react';
import ProductSingle from './ProductSingle';
import PropTypes from 'prop-types';


class Products extends Component {

    render() {
      return (
        <section>
            <div className={(!this.props.inCategory) ? "products-wrapper": "products-wrapper-inCategories"}>
            { !this.props.noProducts ? (
                 this.props.products.map((product) => (
                    <ProductSingle key={product.id} product={product} inCategory={this.props.inCategory} />
                ))
            ) : (
                <div className="noProductsWrap">
                    <p className="noProducts">Store has  no products at current time...</p>
                </div>
            )}  
            </div>
        </section>
        );
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
}

export default Products;
