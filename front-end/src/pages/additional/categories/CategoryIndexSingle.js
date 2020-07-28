import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class CategorySingle extends Component {
    state = {
        hover: false
    }

    render() {  
        return (
            <>   
                <Link className="category-item-wrap" to={`/category/${this.props.category.id}`} onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
                    <li>
                        <div className="category-img-wrap">
                            <img className={this.state.hover ? "single-category-img hoverImage" : "single-category-img"} src= {this.props.category.image}  alt="" />
                        </div>
                        <div className="category-name-wrap">
                            <h3 className={"categoryName", (this.state.hover) ? "onHoverWhite" : ""}>{ this.props.category.name}</h3>
                        </div>
                    </li>
                </Link>
            </>
        )
    }
}

CategorySingle.propTypes = {
    category: PropTypes.object.isRequired,
}

export default CategorySingle;
