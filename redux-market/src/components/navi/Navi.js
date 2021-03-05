import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";
import CartSummary from "../cart/CartSummary";

class Navi extends Component {

    state = {
        isOpen : false
    };

    toggle = () => {
        let open = this.state.isOpen ? false : true;
        this.setState({
            isOpen : open
        });
    }

  render() {
    return (
      <div className="bg-dark shadow mb-3" >
        <Navbar color="dark" dark className="container navbar-expand">
          {/* <NavbarBrand href="/"><h1>REDUX MARKET</h1></NavbarBrand> */}
          <Link className="navbar-brand" to="/"><h1>REDUX MARKET</h1></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link  className="nav-link" to="/saveProduct">Add New Product</Link>
              </NavItem>
              <CartSummary/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navi;
