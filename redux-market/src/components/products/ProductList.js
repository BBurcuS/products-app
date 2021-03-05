import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class ProductList extends Component {

  componentDidMount() {
    this.props.actions.getProducts();
  };

  addToCart = (product) => {
    this.props.actions.addToCart({quantity:1,product});
    alertify.success(product.productName + " added.",2);
  };

  render() {
    const {products} = this.props;
    return (
      <div>
        <h3 className="justify-content-between">
          <Badge color="info" className="mr-2">
            PRODUCTS 
          </Badge>
          <Badge color="success" pill>
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <Table striped>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td><Link to={"/saveproduct/"+product.id}>{product.productName}</Link></td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td><Button color="warning" onClick={()=>this.addToCart(product)}>Add</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
