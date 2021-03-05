import alertify from "alertifyjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class CartDetail extends Component {
  removeFromCart = (product) => {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " deleted",2);
  };

  renderEmptyCart() {
    return <Container className="bg-light shadow p-3 rounded text-center">EMPTY</Container>;
  }

  renderFullCart() {
    const { cart } = this.props;
    return (
      <Container className="bg-light shadow p-3 rounded">
        <Table striped>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  };

  render() {
    const { cart } = this.props;
    return <div>{cart.length > 0 ? this.renderFullCart() : this.renderEmptyCart()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
