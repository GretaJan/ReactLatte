import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DetailsBtn from '../buttons/GreenBtn';

const ProductsConditionalWrap = ( {condition, wrap, children}) => condition ? wrap(children) : <>{children}</>;


class ProductSingle extends Component {
    state = {
        hover: false,
        hoverImage: false,
    }
  
    hoverToggle = () => {
        this.setState({hover: !this.state.hover});
    }
    hoverImageToggle = () => {
        this.setState({hoverImage: !this.state.hover});
    }

    render() {
    var hoverStyle;
    var setOpacity;
    var hoverBackground;
    var hoverImg

    if (this.state.hover) {
        hoverStyle = 'hoverStyleDisplay';
        hoverBackground = 'hoverBackgroundClass'; 
        setOpacity = {
            opacity: '0.5', 
            transition: 'opacity 0.5s ease'
        };
    } else {
        hoverStyle = 'hoverStyleHide';
        hoverBackground = ''; 
        setOpacity = {opacity: '1'};
    }
    

      
return (
    <ProductsConditionalWrap 
        condition={this.props.inCategory} 
            wrap={children => <Link to={`/product/${this.props.product.id}/${this.props.product.category_id}`}>{children}</Link>}
        >
         <div className ={this.props.inCategory ? "product-item-category": "product-item"}>
           <div className={ this.props.inCategory ? hoverBackground : '' } onMouseOver={this.hoverToggle}  onMouseOut={this.hoverToggle}> 
                <div className ={this.props.inCategory ? "single-product-img-wrap-inCategory": "single-product-img-wrap"}>
                    <Link to={`/product/${this.props.product.id}/${this.props.product.category_id}`} onMouseOver={this.hoverImageToggle}  onMouseOut={this.hoverImageToggle}>  
                        <img className={!this.props.inCategory ? (this.state.hoverImage ? "single-product-img hoverImage" : "single-product-img") : (this.state.hover ? "single-product-img hoverImage" : "single-product-img") } src= {this.props.product.image} />
                    </Link>
                </div>
                <div className = {this.props.inCategory ? "product-title-wrap-inCategories title" : "product-title-wrap title"}><h3 className="products-title">{ this.props.product.title}</h3></div>
                <div className="price-btn-wrap" className ={this.props.inCategory ? "price-btn-wrap-inCategory": "price-btn-wrap"}>
                    <div className="price-wrap" className ={this.props.inCategory ? "price-wrap-inCategory": "price-wrap"}>
                        <p className="product-original-price" >{this.props.product.original_price}&euro;</p>
                        <p className="product-lower-price">{this.props.product.lower_price}&euro;</p>
                    </div>
                    <ProductsConditionalWrap
                        condition={!this.props.inCategory}
                    wrap={children => <Link to={`/product/${this.props.product.id}/${this.props.product.category_id}`}>{children}</Link>}
                    >
                       <DetailsBtn title={"View Details"}  classNameHover={this.props.inCategory ? hoverStyle: ''} />
                    </ProductsConditionalWrap>
                </div>
            </div>
        </div>
    </ProductsConditionalWrap> 
    );

    }
}

ProductSingle.propTypes = {
    product: PropTypes.object.isRequired,

}

export default ProductSingle