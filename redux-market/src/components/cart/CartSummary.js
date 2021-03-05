
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { bindActionCreators } from "redux";
import CustomizedBadges from "../toolbox/customizeBudgesCart";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

class CartSummary extends Component {

    removeFromCart = (product) => {
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " deleted",2);
      };

  renderEmpty() {
    return (
      <NavItem>
        <NavLink className="text-white">Emtpy Cart</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="text-white">
        My Cart
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id} className="d-flex">
              <span className="material-icons mr-2" onClick={()=>this.removeFromCart(cartItem.product)}>delete</span>
              {cartItem.product.productName}
              <CustomizedBadges quantity = {cartItem.quantity}/>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem><Link to={"/cart"}>My Cart</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      actions: {
        removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
