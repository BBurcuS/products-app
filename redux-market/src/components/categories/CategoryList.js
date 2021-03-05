import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  selectAllProducts = () => {
    const category = {};
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts();
  };

  render() {
    const { categories, currentCategory } = this.props;
    return (
      <div>
        <h3 className="justify-content-between">
          <Badge color="info">CATEGORIES {categories.length}</Badge>
        </h3>
        <ListGroup style={{ cursor: "pointer" }}>
            <ListGroupItem  onClick={() => this.selectAllProducts()} active={Object.keys(currentCategory).length === 0 ? true : false}>
              All Products
            </ListGroupItem>
          {categories.map((category) => (
            <ListGroupItem
              active={category.id === currentCategory.id ? true : false}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ), 
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
